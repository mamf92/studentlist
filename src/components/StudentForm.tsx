import type { Student } from '../pages/StudentSearchPage'

type StudentFormProps = {
  student?: Student
  onSubmitStudent: (student: Student) => void
  onClose: () => void
}

export default function StudentForm({
  student,
  onSubmitStudent,
  onClose,
}: StudentFormProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const studentData: Student = {
      id: student?.id || '',
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      postal_code: formData.get('postal_code') as string,
      city: formData.get('city') as string,
    }
    onSubmitStudent(studentData)
    onClose()
  }
  return (
    <div className="bg-mutedbackground/50 fixed top-0 left-0 z-40 h-screen w-screen backdrop-blur-xs dark:bg-black/50">
      <div className="fixed top-1/2 left-1/2 z-50 flex w-[calc(100vw-1rem)] max-w-150 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-lg bg-white px-2 py-4 sm:w-[calc(80vw)]">
        <h1 className="text-heading font-inter mt-4 mb-4 flex self-start text-3xl">
          {student ? 'Rediger elev' : 'Legg til elev'}
        </h1>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="bg-mutedbackground flex w-full flex-col rounded-lg p-4">
            <div className="flex items-center border-b py-2">
              <label
                htmlFor="first_name"
                className="text-copy font-inter block w-1/3"
              >
                Fornavn:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="font-sometype-mono text-copy w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Fornavn"
                defaultValue={student?.first_name || ''}
              />
            </div>
            <div className="flex items-center border-y py-2">
              <label
                htmlFor="last_name"
                className="text-copy font-inter block w-1/3"
              >
                Etternavn:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="font-sometype-mono text-copy w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Etternavn"
                defaultValue={student?.last_name || ''}
              />
            </div>
            <div className="flex items-center border-y py-2">
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
                className="font-sometype-mono text-copy w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Telefonnummer"
                defaultValue={student?.phone || ''}
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
                min={3}
                className="font-sometype-mono text-copy w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Adresse"
                defaultValue={student?.address || ''}
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
                className="font-sometype-mono text-copy w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Postnummer"
                defaultValue={student?.postal_code || ''}
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
                className="font-sometype-mono text-copy w-full rounded-full border border-black bg-white px-4 py-2 placeholder:text-gray-500 focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Sted"
                defaultValue={student?.city || ''}
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-4 px-4">
            <button
              onClick={onClose}
              type="button"
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="rounded-full border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              {student ? 'Lagre endringer' : 'Legg til elev'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
