import { useMemo } from "react";


/**
 * A custom hook for paginating an array of elements.
 *
 * @template T - The type of elements in the array.
 *
 * @param {T[]} elementsFiltered - The array of elements to paginate.
 * @param {number} currentPage - The current page number.
 * @param {number} itemsPerPage - The number of items to display per page.
 *
 * @returns {Object} An object containing:
 * - totalPages: The total number of pages available based on the items per page.
 * - items: The array of items for the current page.
 */

/**
 * Cuando defines un hook genérico con const, necesitas agregar una coma después de <T>:
 * Esto es un truco de TypeScript para evitar que interprete <T> como un JSX tag.
 */

const usePagination = <T,>( elementsFiltered: T[], currentPage: number, itemsPerPage: number) => {

    const totalPages = useMemo( () => {
        return Math.ceil(elementsFiltered.length / itemsPerPage);
    }, [elementsFiltered, itemsPerPage]);

    const items = useMemo( () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;
        return elementsFiltered.slice(start, end); 
    }, [elementsFiltered, currentPage, itemsPerPage]);


    return { totalPages, items}

}

export default usePagination;