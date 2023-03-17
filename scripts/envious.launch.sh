#!/bin/bash
tmux new-session -d -s envious 'ros2 launch turtlebot3_bringup robot.launch.py';
tmux split-window;
tmux send 'ros2 launch rosbridge_server rosbridge_websocket_launch.xml' ENTER;
tmux split-window;
tmux send 'ros2 run v4l2_camera v4l2_camera_node' ENTER;