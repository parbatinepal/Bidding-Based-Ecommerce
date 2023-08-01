import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCategories() {
    const [categories, setCategories] = useState([]);

    

    // get cat
    const getCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/category/get-category');
            setCategories(data?.category);
            console.log(data.category)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}
