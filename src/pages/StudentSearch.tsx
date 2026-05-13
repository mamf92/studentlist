import { useEffect, useState } from 'react'
import studentsData from '../assets/output.json'

type Student = {
  id?: string
  first_name: string
  last_name: string
  phone: string
  address: string
  postal_code: string
  city: string
}

type SortField = 'first_name' | 'last_name' | 'address' | 'city'

function StudentSearch() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSortField, setSelectedSortField] =
    useState<SortField>('first_name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    async function loadStudents() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 400))

        setStudents(studentsData as Student[])
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  const sortOptions: { key: SortField; label: string }[] = [
    { key: 'first_name', label: 'Fornavn' },
    { key: 'last_name', label: 'Etternavn' },
    { key: 'address', label: 'Adresse' },
    { key: 'city', label: 'Poststed' },
  ]

  const handleSortClick = (field: SortField) => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setSelectedSortField(field)
  }

  const filteredStudents = students.filter((student) => {
    const matchesNameSearch = student.first_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesSurnameSearch = student.last_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesAddressSearch = student.address
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesPlaceSearch = student.city
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesSearch =
      matchesNameSearch ||
      matchesSurnameSearch ||
      matchesAddressSearch ||
      matchesPlaceSearch

    return matchesSearch
  })

  if (loading) {
    return <p className="p-6">Laster elever...</p>
  }

  if (students.length === 0) {
    return (
      <p className="p-6">
        Det finnes ingen elever i databasen. Legg til en eller flere.
      </p>
    )
  }

  return (
    <div className="max-w-150 flex flex-col gap-5">
      <h1 className="text-4xl text-heading font-inter">Elevsøk</h1>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Søk etter elev..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-black rounded-full text-copy bg-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
      <div>
        <div className="w-full flex justify-between">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSortClick(option.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedSortField === option.key
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-copy">Ingen elever matcher ditt søk.</p>
      ) : (
        <div className="flex flex-col">
          {filteredStudents
            .sort((a, b) => {
              const fieldA = a[selectedSortField]
              const fieldB = b[selectedSortField]
              return sortOrder === 'asc'
                ? fieldA.localeCompare(fieldB)
                : fieldB.localeCompare(fieldA)
            })
            .map((student) => (
              <div className="" key={student.id}>
                <div className="flex border-y border-black py-4 w-full justify-between text-start">
                  <div className="">
                    <p>{student.first_name}</p>
                  </div>
                  <div className="">
                    <p>{student.last_name}</p>
                  </div>
                  <div className="">
                    <p>{student.address}</p>
                  </div>
                  <div className="">
                    <p>{student.city}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default StudentSearch
