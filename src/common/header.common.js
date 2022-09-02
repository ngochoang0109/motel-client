const headerCommon = () => {
	const headers = {
		'Content-Type': 'application/json',
	}
	// return authorization header with jwt token
	let user = JSON.parse(localStorage.getItem('tokenUser'));

	if (user) {
		return { ...headers, 'Authorization': `${user.tokenType} ${user.accessToken}` }
	}
	return { ...headers };
}

export default headerCommon;