import random
import openai
from datetime import datetime, timedelta
from faker import Faker
from app import app
from models import db, User, Post, Comment

print("Seeding has started. ")

fake = Faker()

openai.api_key = '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'

with app.app_context():
    db.drop_all()
    db.create_all()

    # Generate 50 users
    users = []
    for _ in range(50):
        username = fake.unique.user_name()
        password = fake.password()
        user = User(username=username, _password_hash=password)
        users.append(user)
        db.session.add(user)

    db.session.commit()

    # Generate 50 posts
    posts = []
    for _ in range(100):
        user = random.choice(users)
        image_url = "https://picsum.photos/400/500"
        likes = random.randint(0,1000)
        dislikes = random.randint(0,1000)
        created_at = fake.date_time_between(start_date="-3y", end_date="now")
        post = Post(user=user.id, image_url=image_url, likes=likes, 
                    dislikes = dislikes, created_at=created_at)
        posts.append(post)
        db.session.add(post)

    db.session.commit()

    #This functions allows to generate human-like comments using AI
    def generate_comment():
        prompt = "Write a comment about the post that would appear on instagram: "
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens = 100,
            n=1,
            stop=None,
            temperature=0.7
        )
        comment = response.choice[0].text.strip()
        return comment
    
    # Generate 500 comments
    for _ in range(500):
        user = random.choice(users)
        post = random.choice(posts)
        comment_text = generate_comment()
        created_at = fake.date_time_between(start_date="-3y", end_date="now")
        comment = Comment(user_id=user.id, post_id=post.id, comment=comment_text, created_at=created_at)
        db.session.add(comment)

    db.session.commit()

print("Seeding completed successfully.")