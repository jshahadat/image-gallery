import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import UploadButton from "./Component/UploadButton";

const data = [
  {
    id: "item-1",
    src: "https://i.ibb.co/nCr5rQt/image-1.webp",
  },
  {
    id: "item-2",
    src: 'https://i.ibb.co/6X08kmm/image-2.webp',
  },
  {
    id: "item-3",
    src: 'https://i.ibb.co/X8L1XLr/image-3.webp',
  },
  {
    id: "item-4",
    src: 'https://i.ibb.co/Zz2ZJ3z/image-4.webp',
  },
  {
    id: "item-5",
    src: 'https://i.ibb.co/Sx8K3h0/image-5.webp'
  },
  {
    id: "item-6",
    src: 'https://i.ibb.co/NFy2f4Z/image-6.webp',
  },
  {
    id: "item-7",
    src: 'https://i.ibb.co/FxCM4GZ/image-7.webp',
  },
  {
    id: "item-8",
    src: 'https://i.ibb.co/9ccbnJz/image-8.webp',
  },
  {
    id: "item-9",
    src: 'https://i.ibb.co/K6vw5xX/image-9.webp',
  },
  {
    id: "item-10",
    src: 'https://i.ibb.co/7XV89qc/image-10.jpg',
  },
  {
    id: "item-11",
    src: 'https://i.ibb.co/vd32HWL/image-11.jpg',
  },
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getImagestyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data);
  }, []);

  // const onDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const reorderedImages = reorder(
  //     images,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   console.log({ reorderedImages });
  //   setImages(reorderedImages);
  // };


  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);
    setImages(updatedImages);
  };






  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const deleteSelectedImages = () => {
    const remainingImages = images.filter((image) => !selectedImages.includes(image));
    setImages(remainingImages);
    setSelectedImages([]);
    setSelectedCount(0);
  };

  const toggleSelection = (image) => {
    const updatedImages = images.map((img) => {
      if (img.id === image.id) {
        img.isSelected = !img.isSelected;
        img.isFeatured = false;
      }
      return img;
    });

    const newlySelectedImages = updatedImages.filter((img) => img.isSelected);
    setImages(updatedImages);
    setSelectedImages(newlySelectedImages);
    setSelectedCount(newlySelectedImages.length);
  };

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      id: `image-${Date.now()}`,
      src: URL.createObjectURL(file),
      isFeatured: false,
      isSelected: false,
    }));
    setImages([...images, ...newImages]);
  };

  return (
    <div className="main_content">

      {selectedImages.length > 0 ?
        <div className='title-container'>
          <h2 className='title'><span><FontAwesomeIcon icon={faCheck} className="title-icon" /></span> {selectedCount} images selected</h2>
          <button className='delete-file' onClick={deleteSelectedImages}>
            Delete Files
          </button>
        </div>
        :
        <>
          <div className='title-container'>
            <h2 className='title'>Gallery</h2>
          </div>
        </>
      }
      <hr />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              className="grid-container"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided, snapshot) => (
                    <div

                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getImagestyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                      className="grid-item"
                    >
                      {image.isSelected === true ? <FontAwesomeIcon onClick={() => toggleSelection(image)} icon={faCheck} className="selected-icon" /> : <FontAwesomeIcon onClick={() => toggleSelection(image)} icon={faCheck} className="selected-iconS" />}
                      <img
                        src={image.src}
                        alt={` ${image.id}`}
                        className={`allimage ${index === 0 ? 'first-image' : 'rest-image'}  ${image.isSelected ? 'selected' : ''}`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className='upload-container'>
                <UploadButton onDrop={onDrop} />
              </div>
            </div>
          )}

        </Droppable>

      </DragDropContext>
    </div>
  );
};

export default App;
