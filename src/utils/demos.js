import random from 'faker/lib/random';

// eslint-disable-next-line
export const randomNum = (min = 0, max = 1000) => random().number({ min, max });
