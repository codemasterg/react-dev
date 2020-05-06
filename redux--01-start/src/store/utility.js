
export const updateObject = (oldObject, updatedValues) => {

    return {
        ...oldObject,   // use spread op to make a shallow copy, every level of nesting must be copied
        ...updatedValues
    }
}
