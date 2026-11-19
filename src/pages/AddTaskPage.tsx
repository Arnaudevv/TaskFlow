import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, 
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, 
    IonTextarea, IonSelect, IonSelectOption, IonButton, IonText,
    IonInput
} from '@ionic/react';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Task } from '../data/tasks';

interface AddTaskPageProps {
    addTask: (task: Task) => void;
}

interface TaskForm {
    title: string;
    description: string;
    category: string;
    priority: string;
}

const initialForm: TaskForm = {
    title: "",
    description: "",
    category: "",
    priority: "Mitjana"
}

function AddTaskPage({ addTask }: AddTaskPageProps): ReactElement {
    
    const navigate = useNavigate();

    const [form, setForm] = useState<TaskForm>(initialForm);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        category: "",
    })
    
    const handleChange = (
        field: keyof TaskForm,
        value: string
    ) => {
        setForm(prev => ({
            ...prev, [field]: value
        }));


        if (field in errors) setErrors(prev => ({
            ...prev, [field]: ''
        }));
    };

    const validateForm = (): boolean => {
        const newErrors = {
            title: '',
            description: '',
            category: ''
        };

        if (form.title.trim() === '') newErrors.title = 'El titol és obligatori'
        else if (form.title.trim().length < 3) newErrors.title = 'Mínim 3 carácters'
    
        if (form.description.trim() === '') newErrors.description = 'La descripció és obligatòria'
        
        if (form.category === '') newErrors.category = 'Selecciona una categoria'
        
        setErrors(newErrors);
    
        return Object.values(newErrors).every (
            error => error === ''
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return

        const newTask: Task = {
            id: Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
            priority: form.priority,
            done: false, 
            startTime: null,
            endTime: null,
            duration: 0
        };

        addTask(newTask);
        console.log("Nova tasca creada", newTask);
        setForm({...initialForm});

        setErrors({
            title: '',
            description: '',
            category: ''
        })

        navigate('/tasks');
    }

    const handleReset = () => {
        setForm({...initialForm});
        setErrors({
            title: '',
            description: '',
            category: ''
        });
    }


    return(
        <IonPage>
            
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Afegir tasca
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding form-content">
                <IonCard className="form-card">
                    <IonCardHeader>
                        <IonCardTitle>Nova Tasca</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <IonItem>
                                <IonInput label="Títol" 
                                            labelPlacement="stacked" 
                                            placeholder="Ex: Preparar examen"
                                            value={form.title}
                                            onIonInput={e => handleChange(
                                                'title',
                                                e.detail.value ?? ''
                                            )}
                                        />
                            </IonItem>
                            {errors.title && (
                                <IonText color="danger">
                                    <p>{errors.title}</p>
                                </IonText>
                            )}
                            <IonItem>
                                <IonTextarea
                                    label="Descripcio"
                                    labelPlacement="stacked"
                                    placeholder="Descriu la tasca..."
                                    rows={4}
                                    value={form.description}
                                    onIonInput={ e => handleChange('description', e.detail.value ?? '')}
                                />
                            </IonItem>
                            {errors.description && (
                                <IonText color="danger">
                                    <p>{errors.description}</p>
                                </IonText>
                            )}

                            <IonItem>
                                <IonSelect
                                    label="Categoria"
                                    labelPlacement="stacked"
                                    placeholder="Selecciona una categoria"
                                    value={form.category}
                                    onIonChange={ e => handleChange('category', e.detail.value)}
                                >
                                    <IonSelectOption value="Estudis">Estudis</IonSelectOption>
                                    <IonSelectOption value="Feina">Feina</IonSelectOption>
                                    <IonSelectOption value="Personal">Personal</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            {errors.category && (
                                <IonText color="danger">
                                    <p>{errors.category}</p>
                                </IonText>
                            )}


                            <IonItem>
                                <IonSelect
                                    label="Prioritat"
                                    labelPlacement="stacked"
                                    value={form.priority}
                                    onIonChange={ e => handleChange('priority', e.detail.value)}
                                >
                                    <IonSelectOption value="Baixa">Baixa</IonSelectOption>
                                    <IonSelectOption value="Mitjana">Mitjana</IonSelectOption>
                                    <IonSelectOption value="Alta">Alta</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            
                            <div className="form-actions">

                                <IonButton type="submit" expand="block">
                                Guardar Tasca
                                </IonButton>

                                <IonButton type="button" color="medium" fill='outline' onClick={handleReset}>
                                Netejar
                                </IonButton>
                            </div>

                        </form>
                    </IonCardContent>                    
                </IonCard>
            </IonContent>

        </IonPage>
    )
}

export default AddTaskPage;