interface Props {
  storyId: string
}

export const AddToLibraryButton = ({ storyId }: Props) => {
  const handleAdd = () => {
    console.log('Add story:', storyId)
    // later call API
  }

  return (
    <button 
      onClick={handleAdd}
      className="mt-3 w-full bg-orange-500 text-white py-2 rounded"
    >
      Add to Library
    </button>
  )
}