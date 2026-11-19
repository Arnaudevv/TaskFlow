import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { ReactElement } from 'react';

import type { Task } from '../data/tasks';
import { getElapsedSeconds } from '../data/timer';

interface TasksPageProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  startTimer: (id: number) => void;
  stopTimer: (id: number) => void;
  now: number;
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hours, minutes, secs]
    .map(value => String(value).padStart(2, '0'))
    .join(':');
}

function formatDate(value: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleString('ca-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function TasksPage({
  tasks,
  toggleTask,
  startTimer,
  stopTimer,
  now,
}: TasksPageProps): ReactElement {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Les meves tasques</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tasks-content">
        <div className="tasks-intro">
          <p className="eyebrow">ORGANITZA EL TEU DIA</p>
          <h1>Les teves tasques</h1>
          <p>
            {tasks.length === 1
              ? '1 tasca al teu espai de treball'
              : `${tasks.length} tasques al teu espai de treball`}
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h2>Encara no tens tasques</h2>
            <p>Afegeix-ne una per començar a organitzar-te.</p>
          </div>
        ) : (
          tasks.map(task => {
            const running = task.startTime !== null && task.endTime === null;
            const elapsed =
              running && task.startTime
                ? getElapsedSeconds(task.startTime, now)
                : 0;
            const totalSeconds = task.duration + elapsed;

            return (
              <IonCard className="task-card" key={task.id}>
                <IonCardHeader>
                  <div className="task-heading">
                    <IonCardTitle>{task.title}</IonCardTitle>
                    <span
                      className={`task-status${running ? ' is-running' : ''}${task.done ? ' is-done' : ''}`}
                    >
                      {task.done ? 'Completada' : running ? 'En curs' : 'Pendent'}
                    </span>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <p className="task-description">{task.description}</p>

                  <div className="task-badges">
                    <IonBadge className="task-category">{task.category}</IonBadge>
                    <IonBadge className="task-priority">{task.priority}</IonBadge>
                  </div>

                  <div className="task-timer">
                    <div>
                      <p className="timer-caption">Temps dedicat</p>
                      <p className="timer-value" aria-live="off">
                        {formatTime(totalSeconds)}
                      </p>
                    </div>
                    <IonButton
                      className="timer-button"
                      color={running ? 'danger' : 'primary'}
                      disabled={task.done && !running}
                      onClick={() =>
                        running ? stopTimer(task.id) : startTimer(task.id)
                      }
                    >
                      {running ? 'Aturar' : 'Iniciar'}
                    </IonButton>
                  </div>

                  <div className="task-dates">
                    <span>Inici: {formatDate(task.startTime)}</span>
                    <span>Aturat: {formatDate(task.endTime)}</span>
                  </div>

                  <IonItem className="task-completion" lines="none">
                    <IonCheckbox
                      slot="start"
                      checked={task.done}
                      onIonChange={() => toggleTask(task.id)}
                      aria-label={`Marcar ${task.title} com a completada`}
                    />
                    <IonLabel>Completada</IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
}

export default TasksPage;
