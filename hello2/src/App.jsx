const setSearchQuery = useSetAtom(searchQueryAtom); //write
const handleSearch = async (searchTerm) => {
	setSearchQuery(searchTerm); 
}