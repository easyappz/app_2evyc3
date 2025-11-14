from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from .serializers import MessageSerializer


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)
