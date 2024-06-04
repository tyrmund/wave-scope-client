import { Form, ListGroup } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import beachServices from '../../services/beach.services'
import './Search.css'


const Search = () => {
    const [beachQuery, setBeachQuery] = useState('')
    const [filteredBeaches, setFilteredBeaches] = useState([])

    const handleBeachQuery = event => {
        const { value: query } = event.target
        query === '' ? resetFilter() : triggerSearch(query)
    }

    const resetFilter = () => {
        setFilteredBeaches([])
        setBeachQuery('')
    }

    const triggerSearch = query => {
        setBeachQuery(query)
        getFilteredBeaches(query)
    }

    const getFilteredBeaches = query => {
        beachServices
            .searchBeaches({ name: query })
            .then(({ data }) => {
                console.log('API response:', data)
                setFilteredBeaches(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='Search' >
            <Form.Control
                type="text"
                placeholder="search a beach"
                value={beachQuery}
                onChange={handleBeachQuery}
            />
            {
                (
                    <ListGroup style={{ position: 'absolute', zIndex: 1000 }}>
                        {
                            filteredBeaches.map(beach => {
                                return (
                                    <ListGroup.Item key={beach._id}>
                                        <Link to={`/beaches/${beach._id}`}>
                                            <p className='beachName'> {beach.name} </p>
                                        </Link>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                )
            }
        </div>
    )
}

export default Search