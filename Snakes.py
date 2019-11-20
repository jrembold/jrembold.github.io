
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('seaborn-darkgrid')

class Snake:
    def __init__(self,k):
        self.age = 0
        self.agelimit = 5
        self.poplimit = 1000
        if np.random.random()<1/(1+k):
            self.gender = 'F'
        else:
            self.gender = 'M'

    def gender(self):
        return self.gender

    def age(self):
        return self.age

    def breed(self,snake_list,k,pop):
        if len(snake_list)>1:
            mate = snake_list.pop(np.random.randint(0,len(snake_list)-1))
        else:
            mate = snake_list[0]
        if self.gender != mate.gender:
            if np.random.random() < max(0,1-pop/self.poplimit):
                return Snake(k)
        else:
            return None

    def isold(self):
        if self.age > self.agelimit:
            return True
        return False

    def live(self):
        self.age += 1


def generation(snake_list,k):
    genpop = len(snake_list)
    bachelors = snake_list.copy()
    new = []
    for s in bachelors:
        s.live()
        baby = s.breed(bachelors,k,genpop)
        if baby:
            new.append(baby)
    for s in snake_list:
        if s.isold():
            snake_list.remove(s)
    snake_list.extend(new)
    return snake_list

def main():
    k = 1
    pop = 50
    popcount = [pop]
    snakes = [Snake(k) for i in range(pop)]
    for i in range(1000):
        # k = .75*np.sin(2*np.pi/200*i)+1
        snakes = generation(snakes,k)
        popcount.append(len(snakes))

    fig,ax1 = plt.subplots()
    ax1.plot(popcount, '.-', label='Simulated Snakes')
    ax1.set_xlabel('Generations')
    ax1.set_ylabel('Population')
    ax1.grid(False)
    ax1.legend()

    ax2 = ax1.twinx()
    ax2.plot(.75*np.sin(2*np.pi/200*np.arange(1000))+1,
            color='red',
            label='Oscillating Gender Ratio')
    ax2.set_ylim(0,2)
    ax2.set_ylabel(r'$\frac{m}{f}$ Ratio')
    ax2.legend()
    plt.show()


if __name__ == '__main__':
    main()




