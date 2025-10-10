{OVERALL_GAME_HEADER}

<!-- <div>
    <h3 style="text-align: center">IT Arena {CURRENT_PLAYER_ID}</h3>
</div> -->

<div class="first_section">
    <div class="round_div">
        <h4 style="z-index: 9999999">Жетон маркера раунд</h4>
    </div>
    <div class="projects_div">
        <div id="game_play_area">
            <div id="player-tables">
                <h3>Список всех игроков</h3>
            </div>
        </div>
    </div>
    <div class="actions_div">
        <h4>События</h4>
    </div>
    <!-- <div class="main_div">
        <p>номер раунда:</p>
        <p>комбинация:</p>
    </div> -->
</div>

<div class="player_section">
    <div class="player_pad">
        <h4>Планшет игрока</h4>
    </div>
    <div class="player_stats">
        <h4>Статисткиа игрока</h4>
        <p>Баджерсы: 100</p>
        <p>Найм сотрудников: 5</p>
        <p>выполение задач: 5</p>
    </div>
</div>

<div class="task-block">
    <div class="task-status backlog">
        <div class="task-header">
            <h5>Бэклог</h5>
        </div>
        <div class="tasks-container" id="backlog"></div>
    </div>
    <div class="task-status inProgress">
        <div class="task-header">
            <h5>В работе</h5>
        </div>
        <div class="tasks-container" id="inProgress"></div>
    </div>
    <div class="task-status testing">
        <div class="task-header">
            <h5>Тестирование</h5>
        </div>
        <div class="tasks-container" id="testing"></div>
    </div>
    <div class="task-status done">
        <div class="task-header">
            <h5>Выполнено</h5>
        </div>
        <div class="tasks-container" id="done"></div>
    </div>
</div>

<script>
    // Массив задач
    const tasks = [
        { id: 1, title: 'Задача 1', status: 'backlog' },
        { id: 2, title: 'Задача 2', status: 'backlog' },
        { id: 3, title: 'Задача 2', status: 'backlog' },
        { id: 4, title: 'Задача 2', status: 'backlog' },
        { id: 5, title: 'Задача 2', status: 'backlog' },
        { id: 6, title: 'Задача 3', status: 'inProgress' },
        { id: 7, title: 'Задача 4', status: 'testing' },
        { id: 8, title: 'Задача 5', status: 'done' },
    ];

    // Функция отображения задач
    function renderTasks() {
        // Очистка всех контейнеров
        document.querySelectorAll('.tasks-container').forEach((container) => {
            container.innerHTML = '';
        });

        // Создаем точки для каждой задачи
        tasks.forEach((task) => {
            const div = document.createElement('div');
            div.className = 'task-dot'; // точки всегда красные
            div.title = task.title; // подсказка
            div.addEventListener('click', () => {
                moveTask(task.id);
            });
            document.getElementById(task.status).appendChild(div);
        });
    }

    // Перемещение задачи по статусам
    function moveTask(taskId) {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        switch (task.status) {
            case 'backlog':
                task.status = 'inProgress';
                break;
            case 'inProgress':
                task.status = 'testing';
                break;
            case 'testing':
                task.status = 'done';
                break;
            case 'done':
                // Можно оставить как есть или сделать возврат
                break;
        }
        renderTasks();
    }

    // Изначально отображаем задачи
    renderTasks();
</script>

{OVERALL_GAME_FOOTER}
