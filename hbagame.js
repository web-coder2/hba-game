define(['dojo', 'dojo/_base/declare', 'ebg/core/gamegui', 'ebg/counter'], function (dojo, declare, gamegui, counter) {
    return declare('bgagame.hbagame', ebg.core.gamegui, {
        constructor: function () {
            this.moveCountThisTurn = 0;
            this.tasks = []; // сюда загрузите задачи
        },

        setup: function (gamedatas) {
            console.log('Game setup');

            // Инициализация задач из gamedatas или через AJAX
            this.tasks = gamedatas.tasks || [];

            // Создайте контейнер для задач
            this.getGameAreaElement().insertAdjacentHTML('beforeend', `<div id="tasks_container"></div>`);

            // Отрисуйте задачи
            this.renderTasks();

            // Настроить уведомления
            this.setupNotifications();

            // Восстановите счетчик перемещений
            this.moveCountThisTurn = 0;
        },

        renderTasks: function () {
            const container = document.getElementById('tasks_container');
            container.innerHTML = '';

            this.tasks.forEach((task) => {
                const div = document.createElement('div');
                div.className = 'task-dot';
                div.title = task.title;
                div.draggable = true;
                div.dataset.taskId = task.id;
                div.addEventListener('dragstart', this.onDragStart.bind(this));
                div.addEventListener('click', () => this.moveTask(task.id));
                container.appendChild(div);
            });
        },

        onDragStart: function (e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
        },

        setupDragAndDrop: function () {
            document.querySelectorAll('.task-status').forEach((statusDiv) => {
                statusDiv.addEventListener('dragover', (e) => e.preventDefault());
                statusDiv.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
                    const task = this.tasks.find((t) => t.id === taskId);
                    if (task) {
                        if (this.moveCountThisTurn >= 4) {
                            alert('Вы уже переместили 4 задачи за этот ход.');
                            return;
                        }
                        const newStatus = statusDiv.dataset.status;
                        if (task.status !== newStatus) {
                            task.status = newStatus;
                            this.ajaxcall(
                                '/yourgame/move_task.html',
                                {
                                    task_id: task.id,
                                    new_status: newStatus,
                                },
                                this,
                                function () {
                                    this.moveCountThisTurn++;
                                    this.renderTasks();
                                    this.ajaxcall(
                                        '/yourgame/notify_task_moved.html',
                                        {
                                            task_id: task.id,
                                            task_title: task.title,
                                            player_id: this.player_id,
                                        },
                                        this,
                                        function () {}
                                    );
                                }
                            );
                        }
                    }
                });
            });
        },

        moveTask: function (taskId) {
            if (this.moveCountThisTurn >= 4) {
                alert('Вы уже переместили 4 задачи за этот ход.');
                return;
            }
            const task = this.tasks.find((t) => t.id === taskId);
            if (!task) return;

            // пример смены статуса по клику
            const statuses = ['backlog', 'inProgress', 'testing', 'done'];
            const currentIdx = statuses.indexOf(task.status);
            const nextIdx = (currentIdx + 1) % statuses.length;
            const newStatus = statuses[nextIdx];

            this.ajaxcall(
                '/yourgame/move_task.html',
                {
                    task_id: task.id,
                    new_status: newStatus,
                },
                this,
                function () {
                    this.moveCountThisTurn++;
                    task.status = newStatus;
                    this.renderTasks();

                    // уведомление
                    this.ajaxcall(
                        '/yourgame/notify_task_moved.html',
                        {
                            task_id: task.id,
                            task_title: task.title,
                            player_id: this.player_id,
                        },
                        this,
                        function () {}
                    );
                }
            );
        },

        setupNotifications: function () {
            this.notifqueue.setSynchronous(true);
            this.notifqueue.onNotification('taskMoved', this, function (notif) {
                alert('Задача перемещена: ' + notif.args.task_title);
                // при необходимости обновляйте состояние задач
            });
        },

        onLeavingState: function (stateName) {
            if (stateName === 'yourTurnState') {
                this.moveCountThisTurn = 0;
            }
        },
    });
});
