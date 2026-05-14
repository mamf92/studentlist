import type { Student } from '../pages/StudentSearchPage'
import Placeholder from '../assets/images/placeholder.png'

type StudentDetailsProps = {
  student: Student
  onDeleteStudent: (studentId: string) => void
  onEditStudentClick: (student: Student) => void
  onClose: () => void
}

export default function StudentDetails({
  student,
  onDeleteStudent,
  onEditStudentClick,
  onClose,
}: StudentDetailsProps) {
  const studentDetails = [
    { label: 'Telefon', value: student.phone },
    { label: 'Adresse', value: student.address },
    { label: 'Postnr', value: student.postal_code },
    { label: 'Sted', value: student.city },
  ]
  return (
    <div className="bg-mutedbackground/50 fixed top-0 left-0 z-40 h-screen w-screen backdrop-blur-xs dark:bg-black/50">
      <div className="fixed top-1/2 left-1/2 z-50 flex w-[calc(100vw-1rem)] max-w-150 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-lg bg-white px-2 py-4 sm:w-[calc(80vw)]">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-heading font-inter flex text-3xl">
            {student.first_name} {student.last_name}
          </h1>
          <div className="flex justify-end">
            <img
              src={Placeholder}
              alt="Elevbilde"
              className="size-16 rounded-full object-cover sm:size-20"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="bg-mutedbackground flex w-full flex-col rounded-lg p-4">
            {studentDetails.map((detail) => (
              <div
                className="flex items-center border-y py-2"
                key={detail.label}
              >
                <div className="text-copy font-inter block w-1/3">
                  {detail.label}:
                </div>
                <div className="font-sometype-mono text-copy bg-disabled w-full rounded-full border border-black px-4 py-2 capitalize">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-between gap-4 px-4">
            <button
              onClick={onClose}
              type="button"
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Tilbake
            </button>
            <button
              onClick={() => onDeleteStudent(student.id)}
              type="button"
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Slett elev
            </button>
            <button
              onClick={() => onEditStudentClick(student)}
              type="button"
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Rediger elev
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
