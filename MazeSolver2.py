import matplotlib.pyplot as plt
import numpy as np
import MazeGen


SIZE = 100

maze, enter, exit = MazeGen.gen_maze(SIZE)

path = [np.array(enter)]

rot = np.array([[0,1],[-1,0]])
heading = np.array((1,0))

while any(path[-1] != exit):
    curr = path[-1]
    # print('Currently at:', curr)
    rhead = rot.dot(heading)
    # print('Right heading is: ', rhead)
    rcoord = curr + rhead
    # print('Right coord is: ', rcoord)
    if not (maze[tuple(rcoord)]):
        # print('Turning right and going forward')
        path.append(rcoord)
        heading = rhead
    elif not (maze[tuple(curr+heading)]):
        # print('Going ahead')
        path.append(curr+heading)
    else:
        # print('Rotating left')
        heading=heading.dot(rot)

    repeats = np.where([all(x==path[-1]) for x in path])
    repeats = repeats[0] # Get rid of the silly second term
    if len(repeats) > 1:
        path = path[:repeats[-2]+1]



plt.imshow(maze, cmap='gray_r')
plt.axis('off')
plt.plot([x[1] for x in path], [x[0] for x in path], lw=200/SIZE, color='red')
plt.show()
