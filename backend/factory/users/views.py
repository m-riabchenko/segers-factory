from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from factory.users.serializers import UserSerializer


class RegisterUserAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user = request.data
        serializer = UserSerializer(data=user)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)