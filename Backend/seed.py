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
    def generate_random_text(text_corpus, max_length=100):
        text_model = markovify.Text(text_corpus)
        return text_model.make_sentence(max_length=max_length)
    
    # The below will now be used to train the Markov to generate good random text
    caption_corpus = """
        The rustling of palm trees in a tropical breeze creates a serene and relaxing atmosphere.
        The aroma of a home-cooked meal fills the kitchen, enticing appetites.
        This is a sample caption corpus. Add more sample sentences here to improve the randomness of generated captions.
        You can have multiple sentences in the corpus.
        Each sentence should be on a separate line.
        Customize this corpus by adding your own sentences.
        The Markov chain will use these sentences to generate random text.
        The length and quality of generated captions depend on the corpus.
        Experiment with different sentences and structures.
        More sentences lead to more randomness.
        But avoid making the corpus too large or too small.
        A good range is between 3 to 50 sentences.
        The sun sets in a blaze of orange and pink hues.
        A gentle breeze rustles through the trees, creating a soothing melody.
        Waves crash against the shore, their rhythmic sound echoing in the air.
        The city skyline comes alive at night, with buildings aglow in a sea of lights.
        A solitary flower blooms in a field of green, its vibrant colors drawing attention.
        The sound of laughter fills the room, creating an atmosphere of joy and happiness.
        Birds soar through the sky, their wings gracefully gliding on the wind.
        A rainbow arcs across the sky, its colors vivid and mesmerizing.
        The scent of freshly baked bread wafts through the air, inviting and comforting.
        The sound of waves lapping against the boat creates a sense of calm and tranquility.
        Stars twinkle in the night sky, each one a tiny beacon of light in the darkness.
        The sound of children playing in the park brings a sense of youthful energy to the scene.
        The leaves rustle in the autumn breeze, creating a symphony of nature's music.
        A warm cup of coffee in hand, watching the world go by in peaceful contemplation.
        The sound of rain falling on the roof is soothing, creating a cozy and intimate atmosphere.
        The scent of blooming flowers fills the air, a fragrant reminder of the beauty of nature.
        A gentle snowfall covers the ground, transforming the world into a winter wonderland.
        The crackling of a fireplace adds warmth and coziness to the room.
        The sound of footsteps on a gravel path, each step echoing in the silence.
        The sweet melody of a violin fills the concert hall, captivating the audience's hearts.
        A vibrant sunset paints the sky with a palette of colors, creating a breathtaking view.
        The chirping of birds greets the dawn, signaling the start of a new day.
        The sound of a waterfall cascading down rocks is both powerful and soothing.
        The aroma of freshly cut grass evokes memories of lazy summer days.
        The sound of applause fills the theater, a testament to a captivating performance.
        A gentle stream flows through a lush forest, its crystal-clear water reflecting the sunlight.
        The scent of the ocean lingers in the air, a refreshing reminder of the vastness of the sea.
        The crackling of leaves underfoot signals the arrival of autumn, with its vibrant colors.
        The distant sound of church bells carries across the town, marking the passing of time.
        A flock of birds takes flight, their synchronized movements creating a mesmerizing spectacle.
        The scent of a blooming rose is delicate and intoxicating, a true feast for the senses.
        The sound of a crackling bonfire brings warmth and camaraderie to a chilly evening.
        The rustling of pages turning fills the room, as a captivating story unfolds.
        The scent of freshly fallen rain invigorates the senses, cleansing the world anew.
        The sound of a thunderstorm rolling in sends a thrill of anticipation through the air.
        A gentle fog rolls in, enveloping the landscape in a mysterious and ethereal beauty.
        The scent of pine needles on a crisp morning evokes memories of winter holidays.
        The sound of seagulls crying in the distance transports you to a coastal paradise.
        The crackling of a campfire brings warmth and comfort to a cool summer evening.
        A field of wildflowers sways in the breeze, a vibrant tapestry of colors.
        The scent of freshly brewed coffee awakens the senses, a welcome start to the day.
        The sound of a distant thunderstorm adds drama to the evening sky.
        The rustling of palm trees in a tropical breeze creates a serene and relaxing atmosphere.
        The aroma of a home-cooked meal fills the kitchen, enticing appetites.
        The sound of a gentle stream trickling over rocks is nature's own lullaby.
        The scent of freshly cut lavender is calming and soothing, a balm for the soul.
        The crackling of ice in a glass signals the start of a refreshing drink.
        A chorus of crickets fills the night, a symphony of nature's orchestra.
        The scent of a crackling fireplace brings warmth and comfort to a winter's evening.
        The sound of children's laughter echoes through the playground, a joyful mel
    """


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
        caption_text = generate_random_text(caption_corpus)
        passwords.append(password)
        user = User(
            username=username,
            password=password,
            first_name=first_name,
            second_name=second_name,
            email=email,
            number_of_posts=number_of_posts,
            number_of_followers=number_of_followers,
            number_of_following=number_of_following,
            number_of_likes=number_of_likes,
            number_of_comments=number_of_comments,
            number_of_shares=number_of_shares,
            caption=caption_text
            
        )
        user.password = password  # Hash password is set
        
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
        This is a sample caption corpus. Add more sample sentences here to improve the randomness of generated captions.
        You can have multiple sentences in the corpus.
        Each sentence should be on a separate line.
        Customize this corpus by adding your own sentences.
        The Markov chain will use these sentences to generate random text.
        The length and quality of generated captions depend on the corpus.
        Experiment with different sentences and structures.
        More sentences lead to more randomness.
        But avoid making the corpus too large or too small.
        A good range is between 3 to 50 sentences.
        The sun sets in a blaze of orange and pink hues.
        A gentle breeze rustles through the trees, creating a soothing melody.
        Waves crash against the shore, their rhythmic sound echoing in the air.
        The city skyline comes alive at night, with buildings aglow in a sea of lights.
        A solitary flower blooms in a field of green, its vibrant colors drawing attention.
        The sound of laughter fills the room, creating an atmosphere of joy and happiness.
        Birds soar through the sky, their wings gracefully gliding on the wind.
        A rainbow arcs across the sky, its colors vivid and mesmerizing.
        The scent of freshly baked bread wafts through the air, inviting and comforting.
        The sound of waves lapping against the boat creates a sense of calm and tranquility.
        Stars twinkle in the night sky, each one a tiny beacon of light in the darkness.
        The sound of children playing in the park brings a sense of youthful energy to the scene.
        The leaves rustle in the autumn breeze, creating a symphony of nature's music.
        A warm cup of coffee in hand, watching the world go by in peaceful contemplation.
        The sound of rain falling on the roof is soothing, creating a cozy and intimate atmosphere.
        The scent of blooming flowers fills the air, a fragrant reminder of the beauty of nature.
        A gentle snowfall covers the ground, transforming the world into a winter wonderland.
        The crackling of a fireplace adds warmth and coziness to the room.
        The sound of footsteps on a gravel path, each step echoing in the silence.
        The sweet melody of a violin fills the concert hall, captivating the audience's hearts.
        A vibrant sunset paints the sky with a palette of colors, creating a breathtaking view.
        The chirping of birds greets the dawn, signaling the start of a new day.
        The sound of a waterfall cascading down rocks is both powerful and soothing.
        The aroma of freshly cut grass evokes memories of lazy summer days.
        The sound of applause fills the theater, a testament to a captivating performance.
        A gentle stream flows through a lush forest, its crystal-clear water reflecting the sunlight.
        The scent of the ocean lingers in the air, a refreshing reminder of the vastness of the sea.
        The crackling of leaves underfoot signals the arrival of autumn, with its vibrant colors.
        The distant sound of church bells carries across the town, marking the passing of time.
        A flock of birds takes flight, their synchronized movements creating a mesmerizing spectacle.
        The scent of a blooming rose is delicate and intoxicating, a true feast for the senses.
        The sound of a crackling bonfire brings warmth and camaraderie to a chilly evening.
        The rustling of pages turning fills the room, as a captivating story unfolds.
        The scent of freshly fallen rain invigorates the senses, cleansing the world anew.
        The sound of a thunderstorm rolling in sends a thrill of anticipation through the air.
        A gentle fog rolls in, enveloping the landscape in a mysterious and ethereal beauty.
        The scent of pine needles on a crisp morning evokes memories of winter holidays.
        The sound of seagulls crying in the distance transports you to a coastal paradise.
        The crackling of a campfire brings warmth and comfort to a cool summer evening.
        A field of wildflowers sways in the breeze, a vibrant tapestry of colors.
        The scent of freshly brewed coffee awakens the senses, a welcome start to the day.
        The sound of a distant thunderstorm adds drama to the evening sky.
        The rustling of palm trees in a tropical breeze creates a serene and relaxing atmosphere.
        The aroma of a home-cooked meal fills the kitchen, enticing appetites.
        The sound of a gentle stream trickling over rocks is nature's own lullaby.
        The scent of freshly cut lavender is calming and soothing, a balm for the soul.
        The crackling of ice in a glass signals the start of a refreshing drink.
        A chorus of crickets fills the night, a symphony of nature's orchestra.
        The scent of a crackling fireplace brings warmth and comfort to a winter's evening.
        The sound of children's laughter echoes through the playground, a joyful mel
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













 