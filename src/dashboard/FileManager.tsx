import searchIcon from "../assets/circum_search.png";
import dots from "../assets/3dots.png";
import { folders, files } from "../types";
import { SyntheticEvent, useEffect, useState } from "react";

const FileManager = () => {
  const numberOfFiles = files.length;
  const numberOfFolders = folders.length;
  const [folderFilter, setFolderFilter] = useState<string>();
  const [fileFilter, setFileFilter] = useState<string>();
  const [searchFilter, setSearchFilter] = useState<string>();

  const defaultFoldersNum = 6;
  const defaultFilesNum = 12;

  const [endOfFiles, setEndOfFiles] = useState<number>(defaultFilesNum);
  const [endOfFolders, setEndOfFolders] = useState<number>(defaultFoldersNum);

  const [foldersToggled, setFoldersToggled] = useState<boolean>(false);
  const [filesToggled, setFilesToggled] = useState<boolean>(false);

  //toggling folders
  useEffect(() => {
    if (foldersToggled) {
      setEndOfFolders(folders.length);
    } else {
      setEndOfFolders(defaultFoldersNum);
    }
  }, [foldersToggled]);

  //toggling files
  useEffect(() => {
    if (filesToggled) {
      setEndOfFiles(files.length);
    } else {
      setEndOfFiles(defaultFilesNum);
    }
  }, [filesToggled]);

  return (
    <section className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-0">
      {/* file cards */}
      <div className="screenSection w-full">
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-5">
            <h1 className="lg:text-xl text-black dark:text-white">
              Folders
              <span className="text-[#6F6F6F]"> ({numberOfFolders})</span>
            </h1>

            <h1 className="lg:text-xl text-black dark:text-white">
              Files <span className="text-[#6F6F6F]">({numberOfFiles})</span>
            </h1>
          </div>

          <button className="bg-buttonGreen text-xs text-white dark:bg-[#A9F2F6] dark:text-black px-3 py-1.5 rounded-md hover:scale-110 transition ease-in-out duration-150">
            + New File
          </button>
        </div>

        {/* filter group */}
        <div className="flex flex-row justify-between items-center mt-5">
          <div className="flex flex-row items-center justify-between w-full">
            <select
              onChange={(e: SyntheticEvent<HTMLSelectElement>) => {
                setFolderFilter(e.currentTarget.value);
                setFileFilter(e.currentTarget.value);
              }}
            >
              <option value="">All files & folders</option>
              <option value="shared">shared files & folders</option>
              <option value="updated">updated files & folders</option>
              <option value="added">added files & folders</option>
            </select>

            <div className="tableSearchGrp bg-white dark:bg-transparent w-[150px] lg:w-[224px]">
              <img src={searchIcon} alt="search icon" className="h-5" />
              <input
                type="text"
                placeholder="Search for a file"
                className="w-full outline-0 text-xs placeholder:text-xs"
                value={searchFilter}
                onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                  setSearchFilter(e.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>

        {/* folder group */}
        <div className="mt-5">
          <div className="flex flex-row items-center justify-between mb-4">
            <h1 className="text-base text-black dark:text-white">Folders</h1>

            <button
              className="text-buttonGreen dark:text-[#A9F2F6] underline text-xs"
              onClick={() => setFoldersToggled(!foldersToggled)}
            >
              {foldersToggled ? "See Less" : "See All"}
            </button>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {folders
              .filter(
                (e) =>
                  (!folderFilter || e.filterType === folderFilter) &&
                  (!searchFilter ||
                    e.name.toLowerCase().includes(searchFilter.toLowerCase()))
              )
              .slice(0, endOfFolders)
              .map((element, index) => (
                <div className="docCard" key={index}>
                  <div className="docGrp">
                    <input type="checkbox" />
                    <img src={dots} alt="dots" className="cursor-pointer" />
                  </div>

                  <div>
                    <img
                      src={element.thumbnail}
                      alt="icon thumbnail"
                      className="mx-auto"
                    />
                    <p className="docName">{element.name}</p>
                  </div>

                  <div className="docGrp">
                    <p>{element.size}</p>
                    <p>{element.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* file group */}
        <div className="mt-14">
          <div className="flex flex-row items-center justify-between mb-4">
            <h1 className="text-base text-black dark:text-white">
              Recent Files
            </h1>

            <button
              className="text-buttonGreen dark:text-[#A9F2F6] underline text-xs"
              onClick={() => setFilesToggled(!filesToggled)}
            >
              {filesToggled ? "See Less" : "See All"}
            </button>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {files
              .filter(
                (e) =>
                  (!fileFilter || e.filterType === fileFilter) &&
                  (!searchFilter ||
                    e.name.toLowerCase().includes(searchFilter.toLowerCase()))
              )
              .slice(0, endOfFiles)
              .map((element, index) => (
                <div className="docCard" key={index}>
                  <div className="docGrp">
                    <input type="checkbox" />
                    <img src={dots} alt="dots" className="cursor-pointer" />
                  </div>

                  <div>
                    <img
                      src={element.thumbnail}
                      alt="icon thumbnail"
                      className="mx-auto"
                    />
                    <p className="docName">{element.name}</p>
                  </div>

                  <div className="docGrp">
                    <p>{element.size}</p>
                    <p>{element.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* file activity */}
      <div className=" w-full lg:w-[220px] bg-white dark:bg-black dark:text-white p-2">
        <h2 className="boxHeading">recent activity</h2>
      </div>
    </section>
  );
};

export default FileManager;
