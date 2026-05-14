import type { Student } from '../pages/StudentSearchPage'
import Placeholder from '../assets/images/placeholder.png'

type StudentDetailsProps = {
  student: Student
  onDeleteStudent?: (student: Student) => void
  onEditStudent?: (student: Student) => void
  onClose: () => void
}

export default function StudentDetails({
  student,
  onDeleteStudent,
  onEditStudent,
  onClose,
}: StudentDetailsProps) {
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
        <form className="flex w-full flex-col gap-4">
          <div className="bg-mutedbackground flex w-full flex-col rounded-lg p-4">
            <div className="flex items-center border-b py-2">
              <label
                htmlFor="phone"
                className="text-copy font-inter block w-1/3"
              >
                Telefon:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="font-sometype-mono text-copy bg-disabled w-full rounded-full border border-black px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                value={student.phone}
                disabled
              />
            </div>
            <div className="flex items-center border-y py-2">
              <label
                htmlFor="address"
                className="text-copy font-inter block w-1/3"
              >
                Adresse:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="font-sometype-mono text-copy bg-disabled w-full rounded-full border border-black px-4 py-2 capitalize placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                value={student.address}
                disabled
              />
            </div>
            <div className="flex items-center border-y py-2">
              <label
                htmlFor="postal_code"
                className="text-copy font-inter block w-1/3"
              >
                Postnr:
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                className="font-sometype-mono text-copy bg-disabled w-full rounded-full border border-black px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                value={student.postal_code}
                disabled
              />
            </div>
            <div className="flex items-center border-t py-2">
              <label
                htmlFor="city"
                className="text-copy font-inter block w-1/3"
              >
                Sted:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="font-sometype-mono text-copy bg-disabled w-full rounded-full border border-black px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                value={student.city}
                disabled
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-4 px-4">
            <button
              onClick={onClose}
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Tilbake
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Slett elev
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Rediger elev
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
