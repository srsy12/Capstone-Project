from app.models import db, Campaign, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_campaigns():
    drone = Campaign(
        owner_id=1,
        image_url="https://i.guim.co.uk/img/media/a921d55139061ed100eb4949c3560b5e284851ac/0_2067_4750_2849/master/4750.jpg",
        state="New York",
        country="USA",
        name="Project ShadowWing",
        tagline="Project ShadowWing Stealth Drone - Unseen, Unheard, Unrivaled",
        description="""🌐 Welcome to the future of covert technology with Project ShadowWing - a groundbreaking stealth drone designed to redefine aerial reconnaissance and surveillance. We invite you to join us in bringing this cutting-edge innovation to life through our Fetch campaign.

🚀 Mission Overview:
Project ShadowWing is not just a drone; it's a silent sentinel that ushers in a new era of stealth capabilities. Imagine an unmanned aerial vehicle that glides through the air like a whisper, virtually undetectable to radar and unheard by the human ear. Its mission is to provide unparalleled intelligence gathering without compromising on stealth.

🌟 Key Features:

Stealth Technology: Built with advanced materials and aerodynamics, Project ShadowWing is designed to operate in the shadows, minimizing its radar cross-section and acoustic signature.

Silent Propulsion: Equipped with state-of-the-art electric propulsion, the drone operates nearly silently, making it ideal for discreet operations in urban environments and sensitive areas.

Long-endurance Flight: With cutting-edge battery technology, ShadowWing boasts an extended flight time, ensuring prolonged missions and maximum coverage.

Adaptive Camouflage: Mimicking the surrounding environment, the drone utilizes adaptive camouflage technology for optimal concealment, blending seamlessly into different terrains.

Advanced Sensors: Fitted with high-resolution cameras, infrared sensors, and other cutting-edge surveillance tools, Project ShadowWing delivers crystal-clear intelligence in real-time.

🌍 Why Support Project ShadowWing?

Revolutionize Security: Empower security agencies, law enforcement, and environmental monitoring organizations with an unprecedented advantage in intelligence gathering.

Protect Privacy: The drone is engineered with strict adherence to privacy regulations, ensuring responsible and ethical use in accordance with legal standards.

Innovation for Good: Project ShadowWing represents a leap forward in drone technology. By supporting us, you're contributing to advancements that can have positive implications for various industries.

🤝 How You Can Help:
Your support is crucial in bringing Project ShadowWing to life. By contributing to our Fetch campaign, you become a crucial part of the stealth revolution. Every dollar takes us one step closer to making silent, efficient aerial reconnaissance a reality.

🎁 Rewards:
As a token of our appreciation, backers will have exclusive access to project updates, behind-the-scenes content, and the opportunity to be among the first to experience the power of Project ShadowWing.

🚨 Join Us in Shaping the Future:
Are you ready to be part of a technological breakthrough? Contribute to Project ShadowWing today and help us redefine the possibilities of stealth drone technology. Together, we'll make the skies safer, smarter, and more secure.

🌐 Project ShadowWing - Where Silence Meets Surveillance 🌐
""",
        goal=50000,
    )

    taco = Campaign(
        owner_id=2,
        image_url="https://www.webstaurantstore.com/images/products/large/234035/1362515.jpg",
        state="Texas",
        country="Country",
        name="Taco Knight",
        tagline="Taco Titan: Revolutionizing Taco Night!",
        description=""" Welcome to the future of taco enjoyment! We're thrilled to introduce the Taco Titan, the ultimate solution to messy taco feasts. Join us in making Taco Tuesday and every taco night a hassle-free, delicious experience by supporting our Fetch campaign.

🚀 Why Taco Titan?
Say goodbye to tacos that fall apart mid-bite and the frustration of balancing them on your plate. The Taco Titan is a game-changer, designed to cradle your tacos with perfection, ensuring every savory ingredient stays exactly where it belongs.

🌮 Key Features:

Universal Fit: Taco Titan is crafted to hold various taco sizes and styles, from classic hard shells to soft tortillas and even the trendy street-style tacos. It's the versatile companion for all your taco creations.

Sturdy and Reusable: Made from high-quality, food-grade materials, Taco Titan is durable and reusable. Say farewell to disposable holders that harm the environment—our taco holder is an eco-friendly choice for your kitchen.

Easy Assembly and Cleanup: The clever design allows for quick assembly and disassembly, making cleanup a breeze. Just pop it in the dishwasher, and you're ready for the next taco adventure.

Vibrant and Fun Design: Taco Titan isn't just functional; it's a conversation starter. The vibrant colors and playful design add a touch of fiesta to your dining table, making taco night an even more enjoyable experience.

Family-Friendly: Perfect for family dinners, parties, or casual gatherings, Taco Titan ensures that everyone can customize their tacos without the mess. It's a taco holder that brings people together.

🌍 Why Support Taco Titan?

Elevate Taco Night: Taco Titan transforms your taco nights into a seamless and delightful experience. No more taco casualties means more enjoyment for everyone.

Support Local Innovation: By backing Taco Titan, you're supporting a small business committed to creating innovative and practical kitchen solutions.

Share the Joy: Taco Titan isn't just a product; it's a celebration of good food and good times. Your support helps us share this joy with taco lovers everywhere.

🤝 How You Can Help:
Your contribution to our Fetch campaign is essential in bringing Taco Titan to kitchens around the world. Every dollar helps us fine-tune our design, manufacture high-quality products, and make taco night a universally enjoyable experience.

🎁 Exclusive Rewards:
As a token of our gratitude, backers will receive exclusive early access to Taco Titan, limited-edition colors, and personalized thank-you notes. Your support makes you a vital part of the Taco Titan family.

🌮 Join the Taco Revolution:
Ready to revolutionize taco night? Back Taco Titan today, and let's make messy tacos a thing of the past. Together, we'll turn every taco meal into a fiesta!

🌮🎉 Taco Titan - Because Every Taco Deserves a Throne! 🎉🌮""",
        goal=3000,
    )

    cat = Campaign(
        owner_id=3,
        image_url="https://i.pinimg.com/736x/16/0c/19/160c19f51f40baeb7e02bc8f7758720b.jpg",
        state="Seattle",
        country="USA",
        name="CatSpeak Transcend",
        tagline=" CatSpeak Transcend: Bridging the Communication Gap with Feline Friends ",
        description=""" Welcome to the future of understanding your furry companions like never before! Introducing CatSpeak Transcend, the world's first headphones designed to translate cat meows into human language. Join us on this purr-fect journey of communication and support our Fetch campaign to make CatSpeak Transcend a reality!

🎧 Why CatSpeak Transcend?
Have you ever wondered what your feline friend is trying to tell you with those adorable meows? CatSpeak Transcend is here to unravel the mysteries of your cat's language, providing a deeper connection between you and your whiskered companion.

🐱 Key Features:

Real-time Meow Translation: CatSpeak Transcend uses advanced AI algorithms to analyze and translate your cat's meows instantly. Understand if they're hungry, happy, curious, or in need of some cuddles.

Comfortable and Stylish Design: These headphones are not just functional; they're a fashion statement. With a sleek and comfortable design, CatSpeak Transcend ensures you and your cat can communicate in style.

User-Friendly App: The headphones seamlessly connect to a user-friendly app that deciphers your cat's emotions and intentions. Receive personalized insights, tips, and even play interactive games with your feline friend.

Long-lasting Battery Life: Designed for cat lovers on the go, CatSpeak Transcend boasts a long-lasting battery, allowing you to stay connected with your cat throughout the day.

Two-Way Communication: Not only can you understand your cat, but CatSpeak Transcend also allows you to respond in cat-like sounds, strengthening the bond between you and your pet.

🌍 Why Support CatSpeak Transcend?

Enhance Your Relationship: CatSpeak Transcend isn't just a gadget; it's a tool to deepen the connection between you and your cat, fostering a stronger bond and understanding.

Promote Animal Well-being: By understanding your cat's needs and emotions, you can ensure they live a happy and healthy life. CatSpeak Transcend promotes responsible pet ownership.

Innovation for Pet Lovers: Your support helps us bring this groundbreaking technology to pet lovers around the world, making communication with our feline friends more accessible and enjoyable.

🤝 How You Can Help:
Contribute to our Fetch campaign and be part of the CatSpeak Transcend revolution. Your support will enable us to finalize the design, conduct rigorous testing, and bring this incredible product to cat lovers everywhere.

🎁 Exclusive Rewards:
As a thank-you for your support, backers will receive exclusive early access to CatSpeak Transcend, limited-edition colors, and personalized updates on our journey to bring this innovative technology to life.

🐾 Join the CatSpeak Transcend Family:
Ready to speak the language of your cat? Back CatSpeak Transcend today and let's make every meow count. Together, we'll unlock a new level of understanding and joy in the world of feline companionship!

🎧🐱 CatSpeak Transcend - Where Meows Meet Meaning! 🐱🎧""",
        goal=10000,
    )

    db.session.add(drone)
    db.session.add(taco)
    db.session.add(cat)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_campaigns():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campaigns RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM campaigns"))

    db.session.commit()
