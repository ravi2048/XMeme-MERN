
const  Pagination = ( { postsPerPage, totalPosts, paginate} ) => {
    const pageNumbers = [];

    let x = Math.ceil(totalPosts/postsPerPage);
    // if(x < )
    for(let i = 0; i < x; i++) {
        pageNumbers.push(i);
    }

   
    return (
        <nav>
            <ul className = 'pagination'>
                {
                    pageNumbers.map( number => { return (
                        <li key = {number} className = 'page-item'>
                            <a onClick = { () => paginate(number) } href = '#!' className = 'page-link'>
                                {number+1}
                            </a>
                        </li>
                    )})
                }
            </ul>

        </nav>
    )
}


export default Pagination;

/*
Anchoring the page using href = '#!'
this works because after clicking on pages, the browser scrolls the page to '!' , and as there is no such anchor, the page doesnt scroll or move after click

Detailed ans :
https://stackoverflow.com/questions/37640583/understanding-a-href
*/