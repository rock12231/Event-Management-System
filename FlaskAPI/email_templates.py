# email_templates.py

EVENT_CREATED_TEMPLATE = """
<html>
<head></head>
<body>
    <p>Hello {name},</p>
    <p>We are excited to inform you that a new event titled '{event_title}' has been created.</p>
    <p>Event Details:</p>
    <ul>
        <li>Date: {event_date}</li>
        <li>Location: {event_location}</li>
    </ul>
    <p>Best regards,<br>The Event Team</p>
</body>
</html>
"""

EVENT_PARTICIPATED_TEMPLATE = """
<html>
<head></head>
<body>
    <p>Hello {name},</p>
    <p>Thank you for participating in the event '{event_title}' on {event_date}.</p>
    <p>We hope you had a great time!</p>
    <p>Best regards,<br>The Event Team</p>
</body>
</html>
"""

NEW_EVENT_TEMPLATE = """
<html>
<head></head>
<body>
    <p>Hello {name},</p>
    <p>We wanted to let you know about an exciting new event titled '{event_title}' that is happening soon!</p>
    <p>Event Details:</p>
    <ul>
        <li>Date: {event_date}</li>
        <li>Location: {event_location}</li>
    </ul>
    <p>Don't miss out!</p>
    <p>Best regards,<br>The Event Team</p>
</body>
</html>
"""
