from rest_framework import serializers
from dbmodel.models import ActivityFeed


class ActivityFeedSerializer(serializers.ModelSerializer):
    #image = serializers.ImageField(required=False)

    class Meta:
        model = ActivityFeed
        # fields = ('textContent', 'image')
        fields = "__all__"
