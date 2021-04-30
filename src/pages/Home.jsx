import React, { useState, useEffect } from 'react'
import { Form, Button, Card, InputGroup, Pagination } from 'react-bootstrap'
import axios from 'axios'
import dateformat from 'dateformat'

function Home() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [data, setData] = useState([])

	const fetchData = async (search, page) => {
		console.log(search, page)
		try {
			const res = await axios.get(
				`http://localhost:5000/users?${
					search ? `Full%20Name_like=${search}` : ''
				}&_limit=20${page ? `&_page=${page}` : `&_page=1`}`
			)
			setData(res.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className='main'>
			<InputGroup>
				<Form.Control
					type='text'
					placeholder='Search'
					className={'m-2'}
					onChange={(event) =>
						setSearch(event.target.value)
					}
				/>
				<Button
					variant='primary'
					size='sm'
					className={'m-2'}
					onClick={() => fetchData(search)}>
					Search
				</Button>
			</InputGroup>
			<div className='row mx-2'>
				{data.map((userData) => (
					<div
						key={userData.Id}
						className='col-sm-3 d-flex align-items-stretch my-2'>
						<Card
							style={{
								width: '100%',
							}}>
							<Card.Body>
								<Card.Text>
									<strong>
										Name:
									</strong>
									{
										userData[
											'Full Name'
										]
									}
								</Card.Text>
								<Card.Text>
									<strong>
										Email:
									</strong>
									{
										userData[
											'Email'
										]
									}
								</Card.Text>
								<Card.Text>
									<strong>
										Date
										of
										Birth:
									</strong>
									{dateformat(
										userData[
											'Date of birth'
										],
										'dd-mmmm-yyyy'
									)}
								</Card.Text>
								<Card.Text>
									<strong>
										Country:
									</strong>
									{
										userData[
											'Country'
										]
									}
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>
			<Pagination className={'d-flex justify-content-center'}>
				{[...Array(10)].map((e, i) => (
					<Pagination.Item
						key={i + 1}
						onClick={(e) => {
							setPage(i + 1)
							fetchData('', i + 1)
						}}>
						{i + 1}
					</Pagination.Item>
				))}
			</Pagination>
		</div>
	)
}

export default Home
