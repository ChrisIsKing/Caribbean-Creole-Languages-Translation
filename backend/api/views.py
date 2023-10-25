from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from .inference import inference
from .serializers import EntrySerializer
from base.models import Entry


import os


def translate(text, prompt, context_text):
    return inference(
        api_key = os.environ.get("OPENAI_API_KEY"),
        model_name="gpt-3.5-turbo",
        prompt="Translate the text and provide the resulting Guyanese Creole translation. Please ensure that the translation is clear and accurate. Guyanese Creole is spoken in Guyana and is characterized by its unique vocabulary and grammar. Try to maintain the cultural nuances and colloquialisms if applicable.",
        prompt_variables={
            "context": f"Text: {context_text}\n Translation: {context_translation}",
            "instruction": prompt,
            "text": text
        },
        max_tokens=2048
    )

@api_view(["POST"])
def inferData(request):
    data = request.data

    if 'text' not in data:
        return Response("Error: No text provided")

    
    
    text = data['text']
    prompt = data['prompt']
    context_text = data['context_text']

    if prompt == None or prompt == "":
        prompt = "Translate the text and provide the resulting Guyanese Creole translation. Please ensure that the translation is clear and accurate. Guyanese Creole is spoken in Guyana and is characterized by its unique vocabulary and grammar. Try to maintain the cultural nuances and colloquialisms if applicable."

    if context_text == None or context_text == "":
        context_text = "They are already burnt"


    translation = translate(text, prompt, context_text)
    return Response({'text': text, 'translatedText': translation})

@api_view(["GET"])
def getEntries(request):
    entries = Entry.objects.all().order_by('created_at').reverse()
    serializer = EntrySerializer(entries, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getEntry(request, pk):

    try:
        entry = Entry.objects.get(id=pk)

        #check if entry exists
        if not entry:
            return Response("Error: Entry does not exist", status=status.HTTP_400_BAD_REQUEST)

        serializer = EntrySerializer(entry, many=False)
        return Response(serializer.data)
    
    except:
        return Response("Error: Entry does not exist", status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def addEntry(request):
    data = request.data

    serializer = EntrySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response("Error: Invalid entry", status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.data)


@api_view(["PUT"])
def editEntry(request):
    data = request.data

    if 'id' not in data:
        return Response("Error: No id provided")
    
    entry = Entry.objects.get(id=data['id'])
    serializer = EntrySerializer(instance=entry, data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response("Error: Invalid entry", status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
def deleteEntry(request, pk):
    entry = Entry.objects.get(id=pk)
    if not entry:
        return Response("Error: Entry does not exist", status=status.HTTP_400_BAD_REQUEST)
    
    entry.delete()
    return Response("Entry deleted successfully", status=status.HTTP_200_OK)


class EntryListCreate(generics.ListCreateAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        serializer = EntrySerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response("Error: Invalid entry", status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(["GET"])
def getRandomEntry(request):
    entries = Entry.objects.all().order_by('?')[:1]
    serializer = EntrySerializer(entries, many=True)
    response = {
        "text": serializer.data[0]['english'],
        "translation": serializer.data[0]['creole']
    }
    return Response(response)