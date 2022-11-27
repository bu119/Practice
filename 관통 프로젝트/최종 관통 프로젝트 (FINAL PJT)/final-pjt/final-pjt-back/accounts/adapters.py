from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        user = super().save_user(request, user, form, False)

        interested_genre1 = data.get("interested_genre1")
        if interested_genre1:
            user.interested_genre1 = interested_genre1
            
        interested_genre2 = data.get("interested_genre2")
        if interested_genre2:
            user.interested_genre2 = interested_genre2
            
        interested_genre3 = data.get("interested_genre3")
        if interested_genre3:
            user.interested_genre3 = interested_genre3

        user.save()
        return user