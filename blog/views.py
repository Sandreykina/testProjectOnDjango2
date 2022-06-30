from django.shortcuts import render, get_object_or_404, redirect
from .models import Post
from django.utils import timezone
from .forms import PostForm
from rest_framework.response import Response
from rest_framework import generics
from .serializers import PostSerializer
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from django.views.decorators.csrf import csrf_protect

def home(request):
    if settings.DEBUG:
        template_name = "index-dev.html"
    else:
        template_name = "index.html"
    return render(request, template_name)

class PostView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    #get post by Id or get all posts if there is no Id
    def get(self, request, *args, **kwargs):
        try:
            id = request.query_params["id"]
            if id != None:
                post = Post.objects.get(id=id)
                serializer = PostSerializer(post)
        except:
            queryset = self.get_queryset()
            serializer = PostSerializer(queryset, many=True)
        
        return Response(serializer.data)

    #add new post
    @csrf_protect
    def post(self, request, *args, **kwargs):
        new_post_data = request.data

        user = User.objects.get(id=new_post_data["author"])

        new_post = Post.objects.create(
            author= user,
            title=new_post_data["title"], text=new_post_data["text"],
            created_date=timezone.now(), published_date=timezone.now())

        queryset = self.get_queryset()
        serializer = PostSerializer(queryset, many=True)
        
        return Response(serializer.data)

    #change post by id
    @csrf_protect
    def put(self, request, *args, **kwargs):
        id = request.query_params["id"]
        
        if id != None:
            post_object = Post.objects.get(id=id)               
            data = request.data
            user = User.objects.get(id=data["author"])

            post_object.author = user
            post_object.text = data["text"]
            post_object.created_date = data['created_date']
            post_object.published_date = timezone.now()
            post_object.title = data["title"]

            post_object.save()

            serializer = PostSerializer(post_object)
        
            return Response(serializer.data)

    #delete post by id
    @csrf_protect
    def delete(self, request, *args, **kwargs):
        id = request.query_params["id"]
        
        if id != None:
            post_to_delete=Post.objects.get(id=id)
            post_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
