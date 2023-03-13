tmux \
	new-session `ros2 launch turtlebot3_bringup robot.launch.py` \; \
	split-window `ros2 launch rosbridge_server rosbridge_websocket_launch.xml` \; \
	split-window `ros2 run v4l2_camera v4l2_camera_node` \; \
	new-session `ngrok http 9090` \; \