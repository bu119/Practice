from http.client import MULTIPLE_CHOICES
from django import forms
from .models import Movie

class MovieForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Title'
            }
        )
    )

    audience = forms.IntegerField(
        widget=forms.NumberInput(
            attrs={
                'placeholder': 'Audience'
            }
        )

    )
    
    release_date = forms.DateTimeField(
        widget=forms.DateInput(
            attrs={
                'type': 'date'
            }
        )
    )

    GENRE_CHOICES = [
        ('comedy','코미디'),
        ('romance','로맨스'), 
        ('drama', '드라마'),
        ('action','액션'),
        ('horror','공포'),
        ('fantasy','판타지'),
        ('thriller','스릴러'),
    ]
    genre = forms.ChoiceField(choices= GENRE_CHOICES)

    score = forms.FloatField(
        widget=forms.NumberInput(
            attrs={
                'step': '0.5',
                'min': '0',
                'max': '5',
            }
        )
    )

    poster_url = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'placeholder': 'poster url'
            }
        )
    )

    description = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'placeholder': 'Description'
            }
        )
    )

    class Meta:
        model = Movie
        fields = '__all__'
        # exclude = ('author',)