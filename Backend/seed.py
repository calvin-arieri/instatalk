import random
import openai
from faker import Faker
from app import app
from models import db, User, Post, Comment

print("Seeding has started. ")

fake = Faker()


with app.app_context():
    db.drop_all()
    db.create_all()

    # Generate 20 users (to stay within the RPM limit)
    users = []
    passwords = []
    for _ in range(20):
        username = fake.unique.user_name()
        password = fake.password()
        first_name = fake.first_name()
        second_name = fake.last_name()
        email = fake.email()
        passwords.append(password)
        user = User(username=username,
                    first_name=first_name,
                    second_name=second_name,
                    email=email
        )
        user.password_hash = password # Hash password is set
        user.profile_photo = "https://picsum.photos/400"
        users.append(user)
        db.session.add(user)

    # Print users and passwords to a text file and overwrites the existing file
    with open('user_passwords.txt', 'w') as file:
        for user, password in zip(users, passwords):
            file.write(f"Username: {user.username}\tPassword: {password}\n")

    print (users) #this is only for development
    print (passwords)  #for us to access a user in our client side   

    db.session.commit()

     #This functions allows to generate human-like comments using AI
    def generate_comment():
        prompt = "Write a comment about the post that would appear on instagram: "
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens = 50, # Limiting tokens per comment
            n=1,
            stop=None,
            temperature=0.7
        )
        comment = response.choices[0].text.strip()
        return comment

    # Generate 40 posts to stay within the RPM limit
    posts = []
    for _ in range(40):
        openai.api_key = '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'
        user = random.choice(users)
        image_url = "https://picsum.photos/400/500"
        likes = random.randint(0,1000)
        dislikes = random.randint(0,1000)
        caption = generate_comment()
        created_at = fake.date_time_between(start_date="-3y", end_date="now")
        post = Post(user_id=user.id, image_url=image_url, likes=likes, 
                    dislikes = dislikes, created_at=created_at)
        posts.append(post)
        db.session.add(post)

    db.session.commit()

   
    
    # Generate 200 comments to stay within the TPM limit
    for _ in range(200):
        openai.api_key = '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'
        user = random.choice(users)
        post = random.choice(posts)
        comment_text = generate_comment()
        created_at = fake.date_time_between(start_date="-3y", end_date="now")
        comment = Comment(user_id=user.id, post_id=post.id, comment=comment_text, created_at=created_at)
        db.session.add(comment)

    db.session.commit()

print("Seeding completed successfully.")