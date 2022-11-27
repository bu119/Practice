from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):

    interested_genre1 = serializers.CharField()
    interested_genre2 = serializers.CharField()
    interested_genre3 = serializers.CharField()


    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['interested_genre1'] = self.validated_data.get('interested_genre1','')
        data['interested_genre2'] = self.validated_data.get('interested_genre2','')
        data['interested_genre3'] = self.validated_data.get('interested_genre3','')

        return data