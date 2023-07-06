import random
import markovify
from faker import Faker
from app import app
from models import db, User, Post, Comment

print("Seeding has started.")

fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Generate 20 users (to stay within the RPM limit)
    users = []
    passwords = []
    for _ in range(10):
        username = fake.unique.user_name()
        password = fake.password()
        first_name = fake.first_name()
        second_name = fake.last_name()
        email = fake.email()
        number_of_posts = random.randint(0, 100)
        number_of_followers = random.randint(0, 1000)
        number_of_following = random.randint(0, 1000)
        number_of_likes = random.randint(0, 10000)
        number_of_comments = random.randint(0, 1000)
        number_of_shares = random.randint(0, 1000)
        passwords.append(password)
        user = User(
            username=username,
            first_name=first_name,
            second_name=second_name,
            email=email,
            number_of_posts=number_of_posts,
            number_of_followers=number_of_followers,
            number_of_following=number_of_following,
            number_of_likes=number_of_likes,
            number_of_comments=number_of_comments,
            number_of_shares=number_of_shares
        )
        user.password_hash = password  # Hash password is set
        
        # Manually input 20 image URLs for each user
        image_urls = [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            
            "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60  ",
            
            
           " https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60 ",
           
           
           "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
           
           
           "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60 "
           
           
           
          " https://images.unsplash.com/photo-1687360440667-493016988a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60 "
           
           
           
           "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60 "
           
            
            # Add more image URLs here...
        ]
        user.profile_photo = random.choice(image_urls)
        
        users.append(user)
        db.session.add(user)

    # Print users and passwords to a text file and overwrite the existing file
    with open('user_passwords.txt', 'w') as file:
        for user, password in zip(users, passwords):
            file.write(f"Username: {user.username}\tPassword: {password}\n")

    db.session.commit()

    # This function generates random text using Markov Chains
    def generate_random_text(text_corpus, max_length=100):
        text_model = markovify.Text(text_corpus)
        return text_model.make_sentence(max_length=max_length)
    
    # The below will now be used to train the Markov to generate good random text
    caption_corpus = """
        The rustling of palm trees in a tropical breeze creates a serene and relaxing atmosphere.
        The aroma of a home-cooked meal fills the kitchen, enticing appetites.
    """

 
    
    # Generate 40 posts to stay within the RPM limit
    posts = []
    for user in users:
        for _ in range(10):
            # Manually input 20 different image URLs for each user
            image_url = [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            
            "https://unsplash.com/photos/mEZ3PoFGs_k",
            
            "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60  ",
            
            
           " https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60 ",
           
           
           "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
           
           
           "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60 "
           
           
           
          " https://images.unsplash.com/photo-1687360440667-493016988a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60 "
           
           
           
           "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60 "
                # Add more image URLs here...
            ]
            likes = random.randint(0, 1000)
            dislikes = random.randint(0, 1000)
            caption_text = generate_random_text(caption_corpus)
            created_at = fake.date_time_between(start_date="-3y", end_date="now")
            post = Post(user_id=user.id, image_url=random.choice(image_url), likes=likes, 
                        dislikes=dislikes, created_at=created_at, caption=caption_text)
            posts.append(post)
            db.session.add(post)

    db.session.commit()

    # Generate 200 comments to stay within the TPM limit
    for _ in range(200):
        user = random.choice(users)
        post = random.choice(posts)
        comment_text = generate_random_text(caption_corpus)
        created_at = fake.date_time_between(start_date="-3y", end_date="now")
        comment = Comment(user_id=user.id, post_id=post.id, comment=comment_text, created_at=created_at)
        db.session.add(comment)

    db.session.commit()

print("Seeding completed successfully.")













 