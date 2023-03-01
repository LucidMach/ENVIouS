tmux \
	new-session `ros2 launch turtlebot3_bringup robot.launch.py` \; \
	split-window `ros2 launch rosbridge_server rosbridge_websocket_launch.xml` \; \
	detach-client 