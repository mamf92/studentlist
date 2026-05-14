import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import studentsData from '../assets/output.json'
import StudentForm from '../components/StudentForm'
import StudentDetails from '../components/StudentDetails'
import AscIcon from '../assets/icons/asc.svg?react'
import DescIcon from '../assets/icons/desc.svg?react'
import Add from '../assets/icons/add.svg?react'
import Search from '../assets/icons/search.svg?react'

export type Student = {
  id?: string
  first_name: string
  last_name: string
  phone: string
  address: string
  postal_code: string
  city: string
}

type SortField = 'first_name' | 'last_name' | 'address' | 'city'

function StudentSearchPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSortField, setSelectedSortField] =
    useState<SortField>('first_name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showForm, setShowForm] = useState(false)
  const [showStudentDetails, setShowStudentDetails] = useState(false)

  useEffect(() => {
    async function loadStudents() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const savedStudents = localStorage.getItem('students')
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents))
        } else {
          const studentsWithIds = (studentsData as Student[]).map(
            (student) => ({
              ...student,
              id: uuidv4(),
            })
          )
          setStudents(studentsWithIds)
        }
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  const sortOptions: { key: SortField; label: string; size: string }[] = [
    { key: 'first_name', label: 'Fornavn', size: 'w-[19%]' },
    { key: 'last_name', label: 'Etternavn', size: 'w-[21%]' },
    { key: 'address', label: 'Adresse', size: 'w-[28%]' },
    { key: 'city', label: 'Poststed', size: 'w-[22%]' },
  ]

  const handleSortClick = (field: SortField) => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setSelectedSortField(field)
  }
  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    setShowStudentDetails(true)
  }
  const handleAddStudent = (student: Student) => {
    const newStudent = { ...student, id: uuidv4() }
    const updatedStudents = [...students, newStudent]
    setStudents(updatedStudents)
    handleUpdateLocalStorage(updatedStudents)
    setShowForm(false)
  }

  const handleResetApplication = () => {
    localStorage.removeItem('students')
    location.reload()
  }

  const handleUpdateLocalStorage = (updatedStudents: Student[]) => {
    localStorage.setItem('students', JSON.stringify(updatedStudents))
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
    return (
      <div className="bg-mutedbackground/50 fixed top-0 left-0 z-40 h-screen w-screen backdrop-blur-sm dark:bg-black/50">
        <p className="fixed top-1/3 left-1/2 z-50 -translate-x-1/2 -translate-y-1/3 dark:text-white">
          Laster elever...
        </p>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <p className="p-6">
        Det finnes ingen elever i databasen. Legg til en eller flere.
      </p>
    )
  }

  return (
    <div className="mx-auto mb-4 flex w-full max-w-150 flex-col gap-5 md:max-w-200">
      <div className="absolute top-4 right-4">
        <button
          className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:cursor-pointer hover:bg-black hover:text-white"
          onClick={handleResetApplication}
        >
          Tilbakestill applikasjon
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-heading font-inter text-4xl">Elevsøk</h1>
        <div className="relative flex w-[calc(100vw-2rem)] max-w-150 items-center">
          <input
            type="text"
            placeholder="Søk etter elev..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-copy font-sometype-mono w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
          />
          <Search className="absolute right-6 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-3xl bg-white px-2 py-6 sm:rounded-lg sm:px-6">
        <button
          className="flex items-center self-end rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:cursor-pointer hover:bg-black hover:text-white"
          onClick={() => setShowForm(true)}
        >
          Legg til elev
          <Add className="ml-1 inline h-3 w-3" />
        </button>
        <h2 className="text-heading font-inter text-2xl">Elever</h2>
        <div>
          <div className="flex w-full">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSortClick(option.key)}
                className={`mr-1 flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium transition hover:cursor-pointer hover:bg-black hover:text-white sm:text-sm ${option.size} ${
                  selectedSortField === option.key
                    ? 'border-black bg-black text-white'
                    : 'border-black bg-white text-black'
                }`}
              >
                {option.label}
                {selectedSortField === option.key && (
                  <span className="ml-1">
                    {sortOrder === 'asc' ? (
                      <AscIcon className="inline h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <DescIcon className="inline h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {students.length === 0 && (
          <p className="text-copy">Det finnes ingen elever i databasen.</p>
        )}
        {filteredStudents.length === 0 ? (
          <p className="text-copy">Ingen elever matcher ditt søk.</p>
        ) : (
          <div className="bg-mutedbackground flex flex-col rounded-lg px-2 py-4">
            {filteredStudents
              .sort((a, b) => {
                const fieldA = a[selectedSortField]
                const fieldB = b[selectedSortField]
                return sortOrder === 'asc'
                  ? fieldA.localeCompare(fieldB)
                  : fieldB.localeCompare(fieldA)
              })
              .map((student) => (
                <div
                  className="hover:bg-background hover:cursor-pointer"
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                >
                  <div className="flex w-full justify-between border-y border-black py-4 text-start">
                    <div className="w-[20%]">
                      <p
                        className="text-sm hyphens-auto sm:text-base"
                        lang="no"
                      >
                        {student.first_name}
                      </p>
                    </div>
                    <div className="w-[23%]">
                      <p
                        className="text-sm hyphens-auto sm:text-base"
                        lang="no"
                      >
                        {student.last_name}
                      </p>
                    </div>
                    <div className="w-[30%]">
                      <p
                        className="text-sm hyphens-auto capitalize sm:text-base"
                        lang="no"
                      >
                        {student.address}
                      </p>
                    </div>
                    <div className="w-[27%]">
                      <p
                        className="text-sm hyphens-auto sm:text-base"
                        lang="no"
                      >
                        {student.city}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {showForm && (
        <StudentForm
          onSubmitStudent={handleAddStudent}
          onClose={() => setShowForm(false)}
        />
      )}
      {showStudentDetails && selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setShowStudentDetails(false)}
        />
      )}
    </div>
  )
}

export default StudentSearchPage
