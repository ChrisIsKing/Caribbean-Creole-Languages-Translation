from rest_framework import serializers
from base.models import Entry
from base.models import Prompt

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = '__all__'