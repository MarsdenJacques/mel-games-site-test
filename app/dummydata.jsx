const Blocks = [
    {
        title: 'title',
        type: 'Game',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '15m',
        id: 0,
    },
    {
        title: 'blah',
        type: 'Game',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '15m',
        id: 1,
    },
    {
        title: 'title',
        type: 'Flashcard',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '15m',
        id: 2,
    },
    {
        title: 'abcs',
        type: 'Flashcard',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '15m',
        id: 3,
    },
    {
        title: 'Hi hello',
        type: 'Video',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '5m',
        id: 4,
    },
    {
        title: 'Talking',
        type: 'Video',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '10m',
        id: 5,
    },
    {
        title: 'pelmanism',
        type: 'Game',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '30m',
        id: 6,
    },
    {
        title: 'hahaha',
        type: 'Game',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id felis nec neque pulvinar vulputate. Curabitur in nunc posuere, imperdiet.',
        duration: '15m',
        id: 7,
    },
]

const Lessons = [
    {
        title: 'fun lesson',
        id: 0,
    },
    {
        title: 'cool lesson',
        id: 1,
    },
    {
        title: 'happy lesson',
        id: 2,
    },
    {
        title: 'interesting lesson',
        id: 3,
    },
    {
        title: 'informative lesson',
        id: 4,
    },
]

const LessonBlocks = [
    {
        lesson: 0,
        block: 1,
    },
    {
        lesson: 0,
        block: 3,
    },
    {
        lesson: 0,
        block: 4,
    },
    {
        lesson: 1,
        block: 0,
    },
    {
        lesson: 1,
        block: 2,
    },
    {
        lesson: 1,
        block: 5,
    },
    {
        lesson: 1,
        block: 7,
    },
    {
        lesson: 2,
        block: 1,
    },
    {
        lesson: 2,
        block: 2,
    },
    {
        lesson: 2,
        block: 3,
    },
    {
        lesson: 2,
        block: 6,
    },
    {
        lesson: 3,
        block: 0,
    },
    {
        lesson: 3,
        block: 3,
    },
    {
        lesson: 3,
        block: 4,
    },
    {
        lesson: 3,
        block: 7,
    },
    {
        lesson: 4,
        block: 2,
    },
    {
        lesson: 4,
        block: 3,
    },
    {
        lesson: 4,
        block: 5,
    },
    {
        lesson: 4,
        block: 6,
    },
]

const LessonPlayers = [
    {
        player: 0,
        lesson: 0,
    },
    {
        player: 0,
        lesson: 4,
    },
    {
        player: 1,
        lesson: 0,
    },
    {
        player: 1,
        lesson: 1,
    },
    {
        player: 1,
        lesson: 2,
    },
    {
        player: 2,
        lesson: 0,
    },
    {
        player: 2,
        lesson: 1,
    },
    {
        player: 2,
        lesson: 3,
    },
]

const Players = [
    {
        user: 'James',
        id: 0,
    },
    {
        user: 'Jane',
        id: 1,
    },
    {
        user: 'Jim',
        id: 2,
    },
]

export {Blocks, Lessons, LessonBlocks, LessonPlayers, Players}