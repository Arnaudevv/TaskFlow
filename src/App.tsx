import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  addCircleOutline,
  listOutline,
  statsChartOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { initialTasks } from './data/tasks';
import type { Task } from './data/tasks';
import { getElapsedSeconds } from './data/timer';
import AddTaskPage from './pages/AddTaskPage';
import SummaryPage from './pages/SummaryPage';
import TasksPage from './pages/TasksPage';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';
import './App.css';

setupIonicReact();

function App(): ReactElement {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskflow-stats');
    if (saved) {
      try {
        return JSON.parse(saved) as Task[];
      } catch {
        return initialTasks;
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('taskflow-stats', JSON.stringify(tasks));
  }, [tasks]);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const startTimer = (id: number) => {
    const start = new Date().toISOString();

    setTasks(prev => {
      if (prev.some(task => task.startTime !== null && task.endTime === null)) {
        return prev;
      }

      return prev.map(task =>
        task.id === id && !task.done
          ? {
              ...task,
              startTime: start,
              endTime: null,
            }
          : task,
      );
    });
  };

  const stopTimer = (id: number) => {
    const end = new Date();

    setTasks(prev =>
      prev.map(task => {
        if (
          task.id !== id ||
          task.startTime === null ||
          task.endTime !== null
        ) {
          return task;
        }

        const elapsed = getElapsedSeconds(task.startTime, end.getTime());

        return {
          ...task,
          endTime: end.toISOString(),
          duration: task.duration + elapsed,
        };
      }),
    );
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              path="/tasks"
              element={
                <TasksPage
                  tasks={tasks}
                  toggleTask={toggleTask}
                  startTimer={startTimer}
                  stopTimer={stopTimer}
                  now={now}
                />
              }
            />
            <Route path="/add" element={<AddTaskPage addTask={addTask} />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/">
              <Navigate to="/tasks" replace />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tasks" href="/tasks">
              <IonIcon icon={listOutline} />
              <IonLabel>Tasques</IonLabel>
            </IonTabButton>

            <IonTabButton tab="add" href="/add">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Afegir</IonLabel>
            </IonTabButton>

            <IonTabButton tab="summary" href="/summary">
              <IonIcon icon={statsChartOutline} />
              <IonLabel>Resum</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
