import string
from rest_framework.response import Response
from rest_framework.decorators import api_view
from dbmodel.models import ActivityFeed as ActivityFeedModel
from . import serializers
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.decorators import parser_classes
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Get Feed view
getFeed_response = openapi.Response(
    'Get feed response description', serializers.ActivityFeedSerializer)
createFeed_response = openapi.Response(
    'Create feed response description', serializers.ActivityFeedSerializer)
updateFeed_response = openapi.Response(
    'Update feed response description', serializers.ActivityFeedSerializer)


@swagger_auto_schema(method='GET', operation_description="Post Request to create feed", responses={200: getFeed_response})
@api_view(['GET'])
def getFeed(request):
    activityFeed = ActivityFeedModel.objects.all()
    serializedFeed = serializers.ActivityFeedSerializer(
        activityFeed, many=True)
    return Response(serializedFeed.data)


# Create Feed View
@swagger_auto_schema(method='POST', request_body=serializers.ActivityFeedSerializer, operation_description="Post Request to create feed", responses={201: createFeed_response})
@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
# @parser_classes([MultiPartParser])
def createFeed(request):
    print(request.data)
    serializedFeed = serializers.ActivityFeedSerializer(data=request.data)

    if serializedFeed.is_valid():
        serializedFeed.save()
        return Response(serializedFeed.data, status=200)
    return Response(serializedFeed.error_messages, status=400)


#  Update Feed View
@swagger_auto_schema(method='POST', request_body=serializers.ActivityFeedSerializer, operation_description="Post Request to Update feed", responses={200: updateFeed_response})
@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
def updateFeed(request, id):
    feed = ActivityFeedModel.objects.get(id=id)
    # data = JSONParser().parse(request)
    serializedFeed = serializers.ActivityFeedSerializer(
        instance=feed, data=request.data)

    if serializedFeed.is_valid():
        serializedFeed.save()
        return Response(serializedFeed.data, status=200)
    return Response(serializedFeed.error_messages, status=400)


# Delete Feed view
@swagger_auto_schema(method='POST', operation_description="Post Request to Delete feed", responses={200: "iteam deleted with ID"})
@api_view(['POST'])
def deleteFeed(request, id):
    feed = ActivityFeedModel.objects.get(id=id)
    feed.delete()
    responseMessage = "Iteam "+str(id)+" deleted"
    return Response(responseMessage, status=200)
