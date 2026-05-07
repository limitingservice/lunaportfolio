import cv2
import mediapipe as mp
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import time
from datetime import datetime
import random

# =========================
# Setup MediaPipe for hand tracking
# =========================
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)
mp_draw = mp.solutions.drawing_utils

# =========================
# GUI setup
# =========================
root = tk.Tk()
root.title("Wave & Watch Smartwatch GUI")
root.geometry("400x650")
root.configure(bg="#121212")

# --- Safe close handler (prevents hanging camera / crash on exit) ---
cap = None  # will be set later
def on_close():
    global cap
    try:
        if cap is not None:
            cap.release()
    except:
        pass
    try:
        cv2.destroyAllWindows()
    except:
        pass
    root.destroy()

root.protocol("WM_DELETE_WINDOW", on_close)

# Add instructional title
title_label = tk.Label(
    root,
    text="Wave & Watch Gesture Control",
    font=("Helvetica", 16, "bold"),
    fg="#FFFFFF",
    bg="#121212"
)
title_label.place(relx=0.5, rely=0.05, anchor=tk.CENTER)

# Create smartwatch frame
watch_frame = tk.Frame(root, bg="#121212")
watch_frame.place(relx=0.5, rely=0.55, anchor=tk.CENTER, width=340, height=340)

canvas = tk.Canvas(watch_frame, width=340, height=340, bg="#121212", highlightthickness=0)
canvas.pack()

def create_rounded_rectangle(canvas, x1, y1, x2, y2, radius=25, **kwargs):
    points = [
        x1+radius, y1,
        x2-radius, y1,
        x2, y1,
        x2, y1+radius,
        x2, y2-radius,
        x2, y2,
        x2-radius, y2,
        x1+radius, y2,
        x1, y2,
        x1, y2-radius,
        x1, y1+radius,
        x1, y1
    ]
    return canvas.create_polygon(points, **kwargs, smooth=True)

# Draw bezel + face
canvas.create_oval(10, 10, 330, 330, fill="#1E1E1E", outline="#333333", width=3)
watch_face = canvas.create_oval(20, 20, 320, 320, fill="#000000", outline="#444444", width=1)

# Time UI
time_container = tk.Frame(watch_frame, bg="#000000")
time_container.place(relx=0.5, rely=0.12, anchor=tk.CENTER, width=180, height=50)

time_rounded_bg = create_rounded_rectangle(
    canvas, 80, 25, 260, 75,
    radius=15,
    fill="#111111",
    outline="#3399FF",
    width=2
)

time_label = tk.Label(time_container, text="", font=("Helvetica", 28, "bold"), fg="#FFFFFF", bg="#000000")
time_label.pack(pady=(0, 0))

date_label = tk.Label(time_container, text="", font=("Helvetica", 11), fg="#BBBBBB", bg="#000000")
date_label.pack(pady=(0, 0))

def update_time():
    current_time = datetime.now().strftime("%H:%M")
    current_date = datetime.now().strftime("%a, %b %d")
    time_label.config(text=current_time)
    date_label.config(text=current_date)
    root.after(1000, update_time)

# Content background + divider
content_rounded_bg = create_rounded_rectangle(
    canvas, 80, 90, 260, 280,
    radius=20,
    fill="#111111",
    outline="#333333",
    width=1
)
divider = canvas.create_line(90, 85, 250, 85, fill="#3399FF", width=1)

# Content frames
content_frames = {}
components = ["Weather", "Heart Rate", "Music", "Notifications", "Incoming Call"]

for comp in components:
    frame = tk.Frame(watch_frame, bg="#000000")
    frame.place(relx=0.5, rely=0.55, anchor=tk.CENTER, width=170, height=150)
    content_frames[comp] = frame
    frame.lower()

# Weather UI
weather_frame = content_frames["Weather"]
weather_icon = tk.Label(weather_frame, text="☀️", font=("Helvetica", 28), fg="#FFDD44", bg="#000000")
weather_icon.place(relx=0.5, rely=0.15, anchor=tk.CENTER)

temp_label = tk.Label(weather_frame, text="23°C", font=("Helvetica", 24, "bold"), fg="#FFFFFF", bg="#000000")
temp_label.place(relx=0.5, rely=0.4, anchor=tk.CENTER)

condition_label = tk.Label(weather_frame, text="Sunny", font=("Helvetica", 12), fg="#BBBBBB", bg="#000000")
condition_label.place(relx=0.5, rely=0.55, anchor=tk.CENTER)

local_divider = tk.Frame(weather_frame, height=1, width=100, bg="#333333")
local_divider.place(relx=0.5, rely=0.65, anchor=tk.CENTER)

indy_time_label = tk.Label(weather_frame, text="Indianapolis", font=("Helvetica", 10), fg="#3399FF", bg="#000000")
indy_time_label.place(relx=0.5, rely=0.72, anchor=tk.CENTER)

indy_time_display = tk.Label(weather_frame, text="", font=("Helvetica", 14, "bold"), fg="#FFFFFF", bg="#000000")
indy_time_display.place(relx=0.5, rely=0.85, anchor=tk.CENTER)

def update_indy_time():
    local_time = datetime.now()
    indy_time_display.config(text=local_time.strftime("%H:%M"))

    dst_end_2025 = datetime(2025, 11, 2)
    dst_start_2025 = datetime(2025, 3, 9)

    if dst_start_2025 <= local_time < dst_end_2025:
        indy_time_label.config(text="Indianapolis (EDT)")
    else:
        indy_time_label.config(text="Indianapolis (EST)")

    root.after(60000, update_indy_time)

# Heart Rate UI
heart_frame = content_frames["Heart Rate"]
heart_icon = tk.Label(heart_frame, text="❤️", font=("Helvetica", 30), fg="#FF4444", bg="#000000")
heart_icon.place(relx=0.5, rely=0.20, anchor=tk.CENTER)

bpm_label = tk.Label(heart_frame, text="72", font=("Helvetica", 26, "bold"), fg="#FFFFFF", bg="#000000")
bpm_label.place(relx=0.5, rely=0.50, anchor=tk.CENTER)

bpm_text = tk.Label(heart_frame, text="BPM", font=("Helvetica", 12), fg="#BBBBBB", bg="#000000")
bpm_text.place(relx=0.5, rely=0.75, anchor=tk.CENTER)

def update_heart_rate():
    current_bpm = int(bpm_label.cget("text"))
    new_bpm = current_bpm + random.randint(-2, 2)
    new_bpm = max(65, min(80, new_bpm))
    bpm_label.config(text=str(new_bpm))
    root.after(2000, update_heart_rate)

# Music UI
music_frame = content_frames["Music"]
song_title = tk.Label(music_frame, text="Waves", font=("Helvetica", 14, "bold"), fg="#FFFFFF", bg="#000000")
song_title.place(relx=0.5, rely=0.20, anchor=tk.CENTER)

artist_label = tk.Label(music_frame, text="Ocean Sounds", font=("Helvetica", 11), fg="#BBBBBB", bg="#000000")
artist_label.place(relx=0.5, rely=0.35, anchor=tk.CENTER)

controls_frame = tk.Frame(music_frame, bg="#000000")
controls_frame.place(relx=0.5, rely=0.65, anchor=tk.CENTER, width=120, height=40)

prev_btn = tk.Button(controls_frame, text="⏮", font=("Helvetica", 12), bg="#222222", fg="#FFFFFF", relief=tk.FLAT, padx=2)
prev_btn.pack(side=tk.LEFT, padx=3)

play_btn = tk.Button(controls_frame, text="⏯", font=("Helvetica", 12), bg="#222222", fg="#FFFFFF", relief=tk.FLAT, padx=2)
play_btn.pack(side=tk.LEFT, padx=3)

next_btn = tk.Button(controls_frame, text="⏭", font=("Helvetica", 12), bg="#222222", fg="#FFFFFF", relief=tk.FLAT, padx=2)
next_btn.pack(side=tk.LEFT, padx=3)

# Notifications UI
notifications_frame = content_frames["Notifications"]
notif_title = tk.Label(notifications_frame, text="Notifications", font=("Helvetica", 16, "bold"), fg="#FFFFFF", bg="#000000")
notif_title.place(relx=0.5, rely=0.15, anchor=tk.CENTER)

notif_container = tk.Frame(notifications_frame, bg="#000000", width=160, height=110)
notif_container.place(relx=0.5, rely=0.55, anchor=tk.CENTER)
notif_container.pack_propagate(False)

notif_canvas = tk.Canvas(notif_container, bg="#000000", highlightthickness=0)
notif_canvas.pack(fill="both", expand=True)

notif_frame = tk.Frame(notif_canvas, bg="#000000")
notif_frame_window = notif_canvas.create_window((0, 0), window=notif_frame, anchor="nw", width=140)

notifications = [
    {"app": "Messages", "text": "John: Hey, are we still meeting today?", "time": "10m ago"},
    {"app": "Calendar", "text": "Meeting with Team at 2:00 PM", "time": "30m ago"},
    {"app": "Weather", "text": "Rain expected this afternoon", "time": "1h ago"},
    {"app": "Health", "text": "You've reached your step goal!", "time": "2h ago"}
]

for notif in notifications:
    notif_item = tk.Frame(notif_frame, bg="#111111", width=140, height=50)
    notif_item.pack(pady=4)
    notif_item.pack_propagate(False)

    app_label = tk.Label(notif_item, text=notif["app"], font=("Helvetica", 10, "bold"),
                         fg="#FFFFFF", bg="#111111", anchor="w")
    app_label.pack(fill="x", padx=5, pady=(3, 0))

    text = notif["text"]
    if len(text) > 20:
        text = text[:17] + "..."
    text_label = tk.Label(notif_item, text=text, font=("Helvetica", 8),
                          fg="#BBBBBB", bg="#111111", anchor="w", wraplength=130)
    text_label.pack(fill="x", padx=5, pady=0)

    time_lbl = tk.Label(notif_item, text=notif["time"], font=("Helvetica", 7),
                        fg="#888888", bg="#111111", anchor="w")
    time_lbl.pack(fill="x", padx=5, pady=(0, 3))

notif_frame.update_idletasks()
notif_canvas.config(scrollregion=notif_canvas.bbox("all"))

def on_mousewheel(event):
    notif_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
notif_canvas.bind_all("<MouseWheel>", on_mousewheel)

# =========================
# Call UI
# =========================
call_active = False
call_start_time = 0
call_timer_running = False

call_frame = content_frames["Incoming Call"]

caller_photo_frame = tk.Frame(call_frame, bg="#333333", width=60, height=60)
caller_photo_frame.place(relx=0.5, rely=0.25, anchor=tk.CENTER)

def make_circle(frame):
    frame.update_idletasks()
    width = frame.winfo_width()
    height = frame.winfo_height()
    mask = tk.Canvas(frame, width=width, height=height, bg="#000000", highlightthickness=0)
    mask.create_oval(0, 0, width, height, fill="#333333")
    mask.place(x=0, y=0)
    initials = tk.Label(mask, text="A", font=("Helvetica", 20, "bold"), fg="#FFFFFF", bg="#333333")
    initials.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

call_frame.after(100, lambda: make_circle(caller_photo_frame))

caller_name = tk.Label(call_frame, text="Alex", font=("Helvetica", 16, "bold"), fg="#FFFFFF", bg="#000000")
caller_name.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

call_status = tk.Label(call_frame, text="👍 Accept or 👎 Reject", font=("Helvetica", 10), fg="#FFFFFF", bg="#000000")
call_status.place(relx=0.5, rely=0.6, anchor=tk.CENTER)

# Create call buttons
def create_call_buttons():
    global accept_btn_frame, decline_btn_frame, accept_icon, decline_icon, gesture_hint

    # Remove old ones if they exist
    for name in ["accept_btn_frame", "decline_btn_frame", "gesture_hint"]:
        if name in globals():
            try:
                globals()[name].destroy()
            except:
                pass

    accept_btn_frame = tk.Frame(call_frame, bg="#22CC66", width=50, height=50)
    accept_btn_frame.place(relx=0.35, rely=0.75, anchor=tk.CENTER)

    decline_btn_frame = tk.Frame(call_frame, bg="#CC2222", width=50, height=50)
    decline_btn_frame.place(relx=0.65, rely=0.75, anchor=tk.CENTER)

    def make_button_circle():
        global accept_icon, decline_icon

        accept_mask = tk.Canvas(accept_btn_frame, width=50, height=50, bg="#000000", highlightthickness=0)
        accept_mask.create_oval(0, 0, 50, 50, fill="#22CC66", outline="#22CC66")
        accept_mask.place(x=0, y=0)
        accept_icon = tk.Label(accept_mask, text="✓", font=("Helvetica", 24, "bold"), fg="#FFFFFF", bg="#22CC66")
        accept_icon.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

        decline_mask = tk.Canvas(decline_btn_frame, width=50, height=50, bg="#000000", highlightthickness=0)
        decline_mask.create_oval(0, 0, 50, 50, fill="#CC2222", outline="#CC2222")
        decline_mask.place(x=0, y=0)
        decline_icon = tk.Label(decline_mask, text="✗", font=("Helvetica", 24, "bold"), fg="#FFFFFF", bg="#CC2222")
        decline_icon.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

    call_frame.after(50, make_button_circle)

    gesture_hint = tk.Label(call_frame, text="Use thumb gestures to control", font=("Helvetica", 9),
                            fg="#888888", bg="#000000")
    gesture_hint.place(relx=0.5, rely=0.9, anchor=tk.CENTER)

call_duration_label = tk.Label(call_frame, text="00:00", font=("Helvetica", 18, "bold"), fg="#FFFFFF", bg="#000000")
call_end_hint = tk.Label(call_frame, text="👎 Thumb down to end call", font=("Helvetica", 10), fg="#BBBBBB", bg="#000000")

# =========================
# Navigation indicator
# =========================
indicator_frame = tk.Frame(watch_frame, bg="#000000")
indicator_frame.place(relx=0.5, rely=0.85, anchor=tk.CENTER, width=150, height=20)

indicators = []
for _ in range(len(components)):
    dot = tk.Label(indicator_frame, text="○", font=("Helvetica", 10), fg="#555555", bg="#000000")
    dot.pack(side=tk.LEFT, padx=4)
    indicators.append(dot)

# Webcam view
webcam_label = tk.Label(root, bg="#121212")
webcam_label.place(relx=0.5, rely=0.15, anchor=tk.CENTER, width=120, height=90)

# Flip camera button
camera_index = 0

def flip_camera():
    global cap, camera_index
    camera_index = 1 if camera_index == 0 else 0

    try:
        if cap is not None:
            cap.release()
    except:
        pass

    cap = cv2.VideoCapture(camera_index)
    status_label.config(text=f"Camera switched to {'Back' if camera_index == 1 else 'Front'}")

flip_cam_btn = tk.Button(
    root,
    text="Flip Camera",
    command=flip_camera,
    font=("Helvetica", 10, "bold"),
    bg="#222222",
    fg="#FFFFFF",
    relief=tk.FLAT
)
flip_cam_btn.place(relx=0.5, rely=0.21, anchor=tk.CENTER)

feature_indicator = tk.Label(
    root,
    text="Current: Weather",
    font=("Helvetica", 14, "bold"),
    fg="#3399FF",
    bg="#121212"
)
feature_indicator.place(relx=0.5, rely=0.25, anchor=tk.CENTER)

status_label = tk.Label(
    root,
    text="Show 1-4 fingers or phone gesture (👍+🤙)",
    font=("Helvetica", 12),
    fg="#AAAAAA",
    bg="#121212"
)
status_label.place(relx=0.5, rely=0.3, anchor=tk.CENTER)

# Styling
shine = canvas.create_arc(40, 40, 300, 300, start=45, extent=70,
                          fill="#222222", outline="#222222", stipple="gray12")
canvas.lower(shine)

glow = canvas.create_oval(5, 5, 335, 335, fill="", outline="#444444", width=2)
canvas.lower(glow)

# =========================
# FIX 1: Provide vibrate_feedback (no crash)
# Implemented safely using root.after (no threads)
# =========================
_vibrate_job = None
def vibrate_feedback(color="#FF5555", duration=0.08, repeats=3):
    """Simple safe 'haptic' visual feedback: briefly flash the outer glow."""
    global _vibrate_job
    try:
        if _vibrate_job is not None:
            root.after_cancel(_vibrate_job)
            _vibrate_job = None
    except:
        pass

    steps = max(1, repeats * 2)
    state = {"i": 0, "on": False}

    def step():
        state["on"] = not state["on"]
        canvas.itemconfig(glow, outline=(color if state["on"] else "#444444"))
        state["i"] += 1
        if state["i"] < steps:
            nonlocal_duration_ms = int(max(10, duration * 1000))
            global _vibrate_job
            _vibrate_job = root.after(nonlocal_duration_ms, step)
        else:
            canvas.itemconfig(glow, outline="#444444")

    step()

# =========================
# Call helpers (safe)
# =========================
def update_call_duration():
    if call_timer_running:
        elapsed = time.time() - call_start_time
        minutes = int(elapsed // 60)
        seconds = int(elapsed % 60)
        call_duration_label.config(text=f"{minutes:02d}:{seconds:02d}")
        root.after(1000, update_call_duration)

def show_call_in_progress():
    global call_start_time, call_timer_running

    caller_photo_frame.place_forget()
    caller_name.place_forget()

    # keep status label visible
    call_duration_label.place(relx=0.5, rely=0.65, anchor=tk.CENTER)
    call_end_hint.place(relx=0.5, rely=0.8, anchor=tk.CENTER)

    call_start_time = time.time()
    call_timer_running = True
    update_call_duration()

    call_status.config(text="Connected", fg="#22CC66")
    feature_indicator.config(text="Call in Progress", fg="#22CC66")

def end_call():
    global call_timer_running
    call_timer_running = False
    call_status.config(text="Call ended", fg="#BBBBBB")
    call_end_hint.config(text="Returning to Home...")
    root.after(1500, lambda: highlight_component(0))

# FIX 2/3: reset_call_ui no longer references undefined widgets
def reset_call_ui():
    global call_active, call_timer_running
    call_active = False
    call_timer_running = False

    # restore elements
    call_duration_label.place_forget()
    call_end_hint.place_forget()
    call_end_hint.config(text="👎 Thumb down to end call")

    caller_photo_frame.place(relx=0.5, rely=0.25, anchor=tk.CENTER)
    caller_name.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

    call_status.config(text="👍 Accept or 👎 Reject", fg="#FFFFFF")
    create_call_buttons()

    # start pulsing safely via after()
    pulse_call_status()

    vibrate_feedback(color="#FF5555", duration=0.12, repeats=4)

# FIX 4: pulse_call_status uses root.after (no threads)
_pulse_job = None
def pulse_call_status():
    global _pulse_job
    try:
        if _pulse_job is not None:
            root.after_cancel(_pulse_job)
            _pulse_job = None
    except:
        pass

    def tick():
        global _pulse_job
        if not call_active and active_index == 4:
            current = call_status.cget("fg")
            call_status.config(fg=("#FFFFFF" if current == "#AAAAAA" else "#AAAAAA"))
            _pulse_job = root.after(500, tick)
        else:
            # stop pulsing when call active or leave call screen
            call_status.config(fg="#FFFFFF")

    tick()

def detect_thumb_orientation(hand_landmarks):
    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
    thumb_ip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP]

    if thumb_tip.y < thumb_ip.y - 0.05:
        return "up"
    elif thumb_tip.y > thumb_ip.y + 0.05:
        return "down"
    return "neutral"

# =========================
# Highlighting
# =========================
active_index = 0

def highlight_component(index):
    global active_index
    active_index = index

    for i, dot in enumerate(indicators):
        if i == index:
            dot.config(text="●", fg="#FFFFFF")
        else:
            dot.config(text="○", fg="#555555")

    for i, comp in enumerate(components):
        if i == index:
            content_frames[comp].lift()
            feature_indicator.config(text=f"Current: {components[index]}", fg="#3399FF")
        else:
            content_frames[comp].lower()

    if index == 4:
        reset_call_ui()

    time_container.lift()

# Set initial screen
highlight_component(0)

# =========================
# Finger counting + gesture detection
# =========================
def count_fingers(hand_landmarks):
    finger_tips_ids = [
        mp_hands.HandLandmark.THUMB_TIP,
        mp_hands.HandLandmark.INDEX_FINGER_TIP,
        mp_hands.HandLandmark.MIDDLE_FINGER_TIP,
        mp_hands.HandLandmark.RING_FINGER_TIP,
        mp_hands.HandLandmark.PINKY_TIP
    ]

    finger_dips_ids = [
        mp_hands.HandLandmark.THUMB_IP,
        mp_hands.HandLandmark.INDEX_FINGER_PIP,
        mp_hands.HandLandmark.MIDDLE_FINGER_PIP,
        mp_hands.HandLandmark.RING_FINGER_PIP,
        mp_hands.HandLandmark.PINKY_PIP
    ]

    fingers_up = 0
    thumb_up = False
    pinky_up = False

    if hand_landmarks.landmark[finger_tips_ids[0]].x < hand_landmarks.landmark[finger_dips_ids[0]].x:
        thumb_up = True

    if hand_landmarks.landmark[finger_tips_ids[4]].y < hand_landmarks.landmark[finger_dips_ids[4]].y:
        pinky_up = True

    for i in range(1, 4):
        if hand_landmarks.landmark[finger_tips_ids[i]].y < hand_landmarks.landmark[finger_dips_ids[i]].y:
            fingers_up += 1

    if thumb_up:
        fingers_up += 1
    if pinky_up:
        fingers_up += 1

    phone_gesture = thumb_up and pinky_up and fingers_up == 2
    return fingers_up, phone_gesture

_accept_pending = False
_decline_pending = False
_end_pending = False

def detect_gesture(frame):
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    global call_active, _accept_pending, _decline_pending, _end_pending

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            fingers, phone_gesture = count_fingers(hand_landmarks)

            # On call screen
            if active_index == 4:
                thumb_orientation = detect_thumb_orientation(hand_landmarks)

                if not call_active:
                    if thumb_orientation == "up":
                        status_label.config(text="About to Accept Call - Hold Gesture")
                        if "accept_icon" in globals():
                            accept_icon.config(font=("Helvetica", 26, "bold"))
                        if "decline_icon" in globals():
                            decline_icon.config(font=("Helvetica", 24, "bold"))

                        if not _accept_pending:
                            _accept_pending = True

                            def confirm_accept():
                                global _accept_pending, call_active
                                _accept_pending = False
                                if active_index == 4 and not call_active and detect_thumb_orientation(hand_landmarks) == "up":
                                    call_active = True
                                    status_label.config(text="Call Accepted")
                                    feature_indicator.config(text="Call in Progress", fg="#22CC66")
                                    show_call_in_progress()

                            root.after(800, confirm_accept)

                    elif thumb_orientation == "down":
                        status_label.config(text="About to Decline Call - Hold Gesture")
                        if "decline_icon" in globals():
                            decline_icon.config(font=("Helvetica", 26, "bold"))
                        if "accept_icon" in globals():
                            accept_icon.config(font=("Helvetica", 24, "bold"))

                        if not _decline_pending:
                            _decline_pending = True

                            def confirm_decline():
                                global _decline_pending, call_active
                                _decline_pending = False
                                if active_index == 4 and not call_active and detect_thumb_orientation(hand_landmarks) == "down":
                                    status_label.config(text="Call Rejected")
                                    feature_indicator.config(text="Returning to Home", fg="#AAAAAA")
                                    call_status.config(text="Call declined", fg="#BBBBBB")
                                    vibrate_feedback(color="#FF5555", duration=0.12, repeats=2)
                                    root.after(1500, lambda: highlight_component(0))

                            root.after(800, confirm_decline)
                    else:
                        status_label.config(text="Incoming Call - Use Thumb Gestures")
                        if "accept_icon" in globals():
                            accept_icon.config(font=("Helvetica", 24, "bold"))
                        if "decline_icon" in globals():
                            decline_icon.config(font=("Helvetica", 24, "bold"))

                else:
                    # Call is active -> thumb down ends call
                    if thumb_orientation == "down":
                        status_label.config(text="About to End Call - Hold Gesture")
                        if not _end_pending:
                            _end_pending = True

                            def confirm_end():
                                global _end_pending, call_active
                                _end_pending = False
                                if active_index == 4 and call_active and detect_thumb_orientation(hand_landmarks) == "down":
                                    call_active = False
                                    status_label.config(text="Call Ended")
                                    end_call()

                            root.after(800, confirm_end)

                return frame

            # Not on call screen
            if phone_gesture:
                highlight_component(4)
                status_label.config(text="Incoming Call - Use Thumb Gestures")
                feature_indicator.config(text="Incoming Call from Alex", fg="#FF5555")
                vibrate_feedback(color="#FF5555", duration=0.12, repeats=4)

            elif 1 <= fingers <= len(components) - 1:
                highlight_component(fingers - 1)
                status_label.config(text=f"Selected: {components[fingers - 1]}")
                feature_indicator.config(text=f"Current: {components[fingers - 1]}", fg="#3399FF")

                if fingers == 4:
                    vibrate_feedback(color="#3399FF", duration=0.05, repeats=3)
            else:
                status_label.config(text=f"Show 1-{len(components)-1} fingers or phone gesture")

    return frame

# =========================
# Notification badge (safe pulsing using after)
# =========================
notification_badge = canvas.create_oval(
    270, 95, 280, 105,
    fill="#FF4444",
    outline="#FF6666",
    width=1
)

def pulse_badge(i=0):
    # i increments; stop after a while to reduce noise
    if i >= 20:
        canvas.itemconfig(notification_badge, fill="#FF4444")
        return
    canvas.itemconfig(notification_badge, fill=("#FF6666" if i % 2 == 0 else "#FF4444"))
    root.after(500, lambda: pulse_badge(i + 1))

pulse_badge()

# =========================
# Camera loop (FIX 5: removed cv2.imshow to avoid Tk+OpenCV issues)
# =========================
cap = cv2.VideoCapture(camera_index)

def update_frame():
    global cap
    if cap is None:
        root.after(100, update_frame)
        return

    success, frame = cap.read()
    if success:
        frame = cv2.flip(frame, 1)
        frame = detect_gesture(frame)

        frame_small = cv2.resize(frame, (160, 120))
        img = Image.fromarray(cv2.cvtColor(frame_small, cv2.COLOR_BGR2RGB))
        imgtk = ImageTk.PhotoImage(image=img)
        webcam_label.imgtk = imgtk
        webcam_label.configure(image=imgtk)

    root.after(100, update_frame)

# Start timers/loops
update_time()
update_heart_rate()
update_indy_time()
create_call_buttons()  # ensure buttons exist on first entry if needed
root.after(0, update_frame)

root.mainloop()

# Cleanup (also handled by on_close)
try:
    if cap is not None:
        cap.release()
except:
    pass
try:
    cv2.destroyAllWindows()
except:
    pass
