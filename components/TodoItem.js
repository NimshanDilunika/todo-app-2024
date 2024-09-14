
import React, { useState, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 5,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    checkboxContainer: {
      marginRight: 10,
    },
    todoItemText: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    completed: {
      textDecorationLine: 'line-through',
      color: '#999',
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        margin: 3,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    deleteButton: {
      backgroundColor: '#FF6347',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    pinButton: {
        backgroundColor: '#87CEEB',
    },
    pinButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    itemNumber: {
        fontSize: 14,
        color: '#333',
        marginRight: 10,
    },
    editInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
  });
  

export default function TodoItem({ itemNumber, task, deleteTask, toggleCompleted, renameTask, togglePin }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    const handleRename = useCallback(() => {
        if (newText.trim()) {
            renameTask(task.id, newText.trim());
        }
        setIsEditing(false);
    }, [newText, renameTask, task.id]);
    return (
        <View style={styles.todoItem}>
        <Text style={styles.itemNumber}>{itemNumber}.</Text>
        <View style={styles.checkboxContainer}>
                <Switch
                    value={task.completed}
                    onValueChange={() => toggleCompleted(task.id)}
                    trackColor={{ true: '#4CAF50', false: '#ccc' }}
                    thumbColor={task.completed ? '#fff' : '#888'}
                    accessibilityLabel={`Mark as ${task.completed ? 'incomplete' : 'complete'}`}
                />
            </View>
            {isEditing ? (
                <TextInput
                    style={styles.editInput}
                    value={newText}
                    onChangeText={setNewText}
                    onSubmitEditing={handleRename}
                    onBlur={handleRename}
                />
            ) : (
                <Text style={[styles.todoItemText, task.completed && styles.completed]}>
                    {task.text}
                </Text>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable
                    style={[styles.button, styles.pinButton]}
                    onPress={() => togglePin(task.id)}
                    accessibilityLabel={task.pinned ? 'Unpin task' : 'Pin task'}
                    accessibilityHint="Toggles the pinned state of the task"
                >
                    <Text style={styles.pinButtonText}>{task.pinned ? 'Unpin' : 'Pin'}</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteTask(task.id)}
                    accessibilityLabel="Delete task"
                    accessibilityHint="Removes the task from the list"
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => setIsEditing(!isEditing)}
                    accessibilityLabel={isEditing ? 'Save changes' : 'Edit task'}
                    accessibilityHint="Toggles between editing and saving the task"
                >
                    <Text style={styles.deleteButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

TodoItem.propTypes = {
    itemNumber: PropTypes.number.isRequired,
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        pinned: PropTypes.bool.isRequired,
    }).isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    renameTask: PropTypes.func.isRequired,
    togglePin: PropTypes.func.isRequired,
};
