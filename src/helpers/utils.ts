// =================
// ====Pour la securisation des requetes avec des tokens

import { DocumentSpan } from "typescript";
import { webApiUrl } from "../environements/environement";
// import { Product } from "../models/product";
import { resquestResponse } from "../models/resquestResponse";
import { getItem } from "../services/localStorage.service";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { data } from "react-router-dom";

// =================
// ====Pour la securisation des requetes avec des tokens

export const getToken = () => {
  const auth = getItem("auth");
  if (auth && auth.token) {
    // console.log(auth.token);
    return auth.token;
  }
  return "";
};
// =============== Pour gerer les chemins des images
const cleanImageUrl = (imageUrl: string) => {
  // decouper url ancien

  const newImageUrl =
    webApiUrl.split("api/")[0] + "images" + imageUrl.split("/images")[1];
  return newImageUrl;
};
export const cleanData = (datas: resquestResponse) => {
  if (datas.isSuccess) {
    if (datas?.results) {
      // ====== plusieurs images
      if (datas?.results?.docs) {
        datas.results.docs.map((result: any) => {
          return cleanImageUrl(result.image);
        });
      }
    }
    // ==========
    if (datas?.result) {
      console.log(datas.result);
      datas.results = datas?.result.map((result: any) => {
        if (result?.image) {
          result.image = cleanImageUrl(result.image);
        }
        // ====== plusieurs images
        // if (result?.imageUrls) {
        //   result.imageUrls.map((imageUrl: string) => {
        //     return cleanImageUrl(imageUrl);
        //   });
        // }
        return result;
      });
    }
  }
  return datas;
};
// ======================
// export const reductionRate = (product: Product) => {
//   let result = 0;
//   // const { solde_price, regular_price} = product
//   result =
//     ((product.regular_price - product.price) * 100) /
//     product.regular_price;
//   return result.toFixed(0);
// };
// ===============================

// ===============================
export const validateRegisterForm = (values: any) => {
  const errors: any = {};
  if (!values.username) {
    errors.username = "Saisie obligatoire";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Saisie obligatoire";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalide";
  }

  if (!values.password) {
    errors.password = "Saisie obligatoire";
  } else if (values.password.length < 6) {
    errors.password = "Mot de passe doit avoir 6 chractères au moins";
  } else if (values.password.length > 20) {
    errors.password = "Mot de passe doit avoir 20 chractères au maxi";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Saisie obligatoire";
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword = "Mot de passe doit avoir 6 chractères au moins";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Les mots de passe ne sont identiques";
  } else if (values.confirmPassword.length > 20) {
    errors.confirmPassword = "Mot de passe doit avoir 20 chractères au maxi";
  }

  // if (!values.acceptedTerms) {
  //   errors.acceptedTerms = "Saisie obligatoire";
  // }
  return errors;
};
// ===============================
export const validateProductForm = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = "Saisie obligatoire";
  }
  if (!values.description) {
    errors.description = "Saisie obligatoire";
  }

  if (!values.price) {
    errors.price = "Saisie obligatoire";
  }
  if (!values.stock) {
    errors.stock = "Saisie obligatoire";
  }
  if (!values.image) {
    errors.image = "Sélection obligatoire";
  }

  return errors;
};
// ================================
export const validateLoginForm = (values: any) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Saisie obligatoire";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalide";
  }

  if (!values.password) {
    errors.password = "Saisie obligatoire";
  } else if (values.password.length < 6) {
    errors.password = "Mot de passe doit avoir 6 chractères au moins";
  } else if (values.password.length > 20) {
    errors.password = "Mot de passe doit avoir 20 chractères au maxi";
  }

  return errors;
};
// ================================
export const validateSubscribeForm = (values: any) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalide";
  }
  if (!values.userName) {
    errors.fullName = "Saisie obligatoire";
  } else if (values.userName.length > 15) {
    errors.fullName = "Login doit avoir 20 chractères au maxi";
  }
  return errors;
};
// ================================
// export const formatPrice = (price: number, currency: string = "EUR") => {
//   let options = {
//     style: "currency",
//     currency: currency,
//   };
//   return new Intl.NumberFormat("fr-FR", options as any).format(price);
// };
// ================================
export const sonoreEffet = (status = "success") => {
  console.log(status);

  const audio = document.createElement("audio");
  audio.src = `/assets/audios/${status}.wav`;
  audio.play();
};
// ================================

export const generateId = () => {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

// // ================================
// // Function to generate page numbers with ellipsis
// export const getPaginationRange = (currentPage: number, totalPages: number, pageRangeDisplayed: number): (number | string)[] => {
//   const pages: (number | string)[] = [];
//   const maxPagesToShow = pageRangeDisplayed; // e.g., 5, 7
//   console.log(maxPagesToShow);
//   // handle lastPage less than or equal to maxPagesToShow
//   if (totalPages <= maxPagesToShow) {
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//   } else {
//     // Always include first and last page
//     pages.push(1);

//     // Determine when to show left ellipsis
//     if (currentPage > maxPagesToShow - 2) {
//       // e.g., if current page is beyond 3 for a 5-page range
//       pages.push("...");
//     }

//     // Add pages around the current page
//     const startPage = Math.max(
//       2,
//       currentPage - Math.floor((maxPagesToShow - 3) / 2)
//     );
//     const endPage = Math.min(
//       totalPages - 1,
//       currentPage + Math.ceil((maxPagesToShow - 3) / 2)
//     );

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     // Determine when to show right ellipsis
//     if (currentPage < totalPages - (maxPagesToShow - 3)) {
//       // e.g., if current page is not near the end
//       pages.push("...");
//     }

//     // Always include last page if not already included
//     if (totalPages !== 1) {
//       // Avoid adding last page if it's the only page
//       if (pages[pages.length - 1] !== totalPages) {
//         pages.push(totalPages);
//       }
//     }
//   }
//   return pages;
// };
// ================================
// Function to generate page numbers with ellipsis
export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  pageRangeDisplayed: number
): (number | string)[] => {
  const pages: (number | string)[] = [];
  const maxPagesToShow = pageRangeDisplayed; // e.g., 5, 7
  console.log(maxPagesToShow);
  // handle lastPage less than or equal to maxPagesToShow
  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    // handle ellipsis logics
  } else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxPagesToShow - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    // handle ellipsis in the middle
    if (
      currentPage - firstPage < sideLength ||
      totalPages - currentPage < sideLength
    ) {
      // TODO: populate result array
      for (let j = 1; j <= sideLength + firstPage; j++) {
        pages.push(j);
      }

      // pages.push("...")

      if (
        currentPage - 1 <= sideLength ||
        totalPages - currentPage <= sideLength
      ) {
        pages.push("...");

        for (let k = totalPages - sideLength; k <= totalPages; k++) {
          pages.push(k);
        }
      }
      // handle two ellipsis
    } else if (
      currentPage - firstPage >= deductedMaxLength &&
      totalPages - currentPage >= deductedMaxLength
    ) {
      // TODO: populate result array
      const deductedSideLength = sideLength - 1;
      pages.push(1);
      pages.push("...");
      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        pages.push(l);
      }
      pages.push("...");
      pages.push(totalPages);
      // handle ellipsis not in the middle
    } else {
      const isNearFirstPage =
        currentPage - firstPage < totalPages - currentPage;
      // longueure de nombre restant
      let remainingLength = maxPagesToShow; //

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          pages.push(m);
          remainingLength -= 1;
        }
        pages.push("...");
        remainingLength -= 1;
        // pour ajouter les nombres restant pour atteindre totalPages
        for (let n = totalPages - (remainingLength - 1); n <= totalPages; n++) {
          pages.push(n);
        }
      } else {
        for (let o = totalPages; o >= currentPage - 1; o--) {
          pages.unshift(o);
          remainingLength -= 1;
        }
        pages.unshift("...");
        remainingLength -= 1;
        // pour ajouter les nombres restant pour atteindre la première page
        for (let p = remainingLength; p >= 1; p--) {
          pages.unshift(p);
        }
      }
    }
  }
  return pages;
};

// ================================
// Function exportToExcel

interface TableDataRow {
  [key: string]: any; // Define your data structure more precisely
}

interface ColumnDefinition {
  header: string;
  key: string;
  width?: number; // Optional column width
}

export const exportToExcel = async (
  data: TableDataRow[],
  columns: ColumnDefinition[],
  fileName: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1", {
    properties: {
      tabColor: { argb: "FFC0000" },
      // defaultRowHeight: 80,
    },
  });

  // Add column headers
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width || 15, // Default width if not specified
  }));

  // ======================
  //  // Add headers to the worksheet
  //  const headers = Object.keys(data[0]); // Assuming all objects have the same keys
  //  worksheet.addRow(headers);
  // ======================
  // Add data rows
  data.forEach(async (row, rowIndex) => {
    // for(async(row, rowIndex) => {
    worksheet.addRow(row);
    // ===================
    // console.log(rowIndex);
    const index = rowIndex + 2;
    console.log(index);

    worksheet.getRow(index).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { vertical: "middle", horizontal: "left" };
      // };
    });
  });

  // ================================================
  // Apply basic styling (example: header bold, center aligned)
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF91D2FF" },
      // fgColor: { argb: "FF0000FF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    // cell.font = {
    //   color: { argb: "FFFFFFFF" },
    // };
  });
  worksheet.getColumn(1).eachCell((cell, index) => {
    if (index > 1) {
      cell.value = index - 1;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    }
  });
  worksheet.getColumn(4).eachCell((cell, index) => {
    if (index > 1) {
      cell.alignment = { vertical: "middle", horizontal: "right" };
    }
  });
  worksheet.getColumn(5).eachCell((cell, index) => {
    if (index > 1) {
      cell.alignment = { vertical: "middle", horizontal: "right" };
    }
  });

  // Example of conditional styling (e.g., highlighting a specific cell based on value)
  // Assuming 'price' is a key in your data and you want to style cells where price > 100
  data.forEach((row, rowIndex) => {
    if (row.price && row.price > 30) {
      const priceCell = worksheet.getCell(`D${rowIndex + 2}`); // Adjust column index as needed
      priceCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" }, // Red background
      };
    }
  });

  // Generate and save the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${fileName}.xlsx`);
};
// ====================================

export const exportToExcelWithImage = async (
  data: TableDataRow[],
  columns: ColumnDefinition[],
  fileName: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1", {
    properties: {
      tabColor: { argb: "FFC0000" },
      // defaultRowHeight: 80,
    },
  });

  // Add column headers
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width || 15, // Default width if not specified
  }));

  // ======================
  //  // Add headers to the worksheet
  //  const headers = Object.keys(data[0]); // Assuming all objects have the same keys
  //  worksheet.addRow(headers);
  // ======================
  // Add data rows
  // data.forEach(async(row, rowIndex) => {
  // // for(async(row, rowIndex) => {
  //   worksheet.addRow(row);
  //   // ===================
  //   // console.log(rowIndex);
  //   const index = rowIndex + 2;
  //   console.log(index);

  //   worksheet.getRow(index).eachCell((cell) => {
  //     cell.border = {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       bottom: { style: "thin" },
  //       right: { style: "thin" },
  //     };
  //     cell.alignment = { vertical: "middle", horizontal: "left" };
  //     // };
  //   });

  // });
  // =============================
  // Add data rows and embed images
  // { header: "N°", key: "_id", width: 10 },
  //   { header: "Name", key: "name", width: 20 },
  //   { header: "Description", key: "description", width: 50 },
  //   { header: "Price", key: "price", width: 15 },
  //   { header: "Quantité", key: "stock", width: 15 },
  //   { header: "Image", key: "image", width: 100 },
  for (const rowData of data) {
    const row = worksheet.addRow({
      _id: rowData._id,
      name: rowData.name,
      description: rowData.description,
      price: rowData.price,
      stock: rowData.stock,
    });
    console.log(row);

    // Fetch image data (if URL) and add to workbook
    if (rowData.image) {
      console.log(rowData);

      try {
        const response = await fetch(rowData.image);
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            const base64Image = reader.result as string;
            const imageId = workbook.addImage({
              base64: base64Image,
              extension: "jpeg", // Adjust extension based on your image type
            });

            worksheet.addImage(imageId, {
              tl: { col: 5, row: row.number - 1 }, // Top-left cell for the image (col: 0-indexed, row: 1-indexed)
              ext: { width: 80, height: 80 }, // Image dimensions
            });
            resolve();
          };
        });
      } catch (error) {
        console.error("Error adding image to Excel:", error);
      }
    }
    row.height = 90; // Adjust row height to accommodate the image
  }
  // ================================================
  // Apply basic styling (example: header bold, center aligned)
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF91D2FF" },
      // fgColor: { argb: "FF0000FF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    // cell.font = {
    //   color: { argb: "FFFFFFFF" },
    // };
  });
  worksheet.getColumn(1).eachCell((cell, index) => {
    if (index > 1) {
      cell.value = index - 1;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    }
  });
  worksheet.getColumn(4).eachCell((cell, index) => {
    if (index > 1) {
      cell.alignment = { vertical: "middle", horizontal: "right" };
    }
  });
  worksheet.getColumn(5).eachCell((cell, index) => {
    if (index > 1) {
      cell.alignment = { vertical: "middle", horizontal: "right" };
    }
  });

  // Example of conditional styling (e.g., highlighting a specific cell based on value)
  // Assuming 'price' is a key in your data and you want to style cells where price > 100
  data.forEach((row, rowIndex) => {
    if (row.price && row.price > 30) {
      const priceCell = worksheet.getCell(`D${rowIndex + 2}`); // Adjust column index as needed
      priceCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" }, // Red background
      };
    }
  });

  // Generate and save the Excel file
  // Generate and save the Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  });
};
// ====================================

export const exportToExcelWithImage1 = async (
  data: TableDataRow[],
  columns: ColumnDefinition[],
  fileName: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1", {
    properties: {
      tabColor: { argb: "FFC0000" },
      // defaultRowHeight: 80,
    },
  });

  // Add column headers
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width || 15, // Default width if not specified
  }));
  // worksheet.columns = [
  //   {
  //     header: "Id",
  //     key: "id",
  //     width: 10,
  //   },
  //   { header: "Title", key: "title", width: 32 },
  //   {
  //     header: "Brand",
  //     key: "brand",
  //     width: 20,
  //   },
  //   {
  //     header: "Category",
  //     key: "category",
  //     width: 20,
  //   },
  //   {
  //     header: "Price",
  //     key: "price",
  //     width: 15,
  //   },
  //   {
  //     header: "Rating",
  //     key: "rating",
  //     width: 10,
  //   },
  //   {
  //     header: "Photo",
  //     key: "thumbnail",
  //     width: 30,
  //   },
  // ];

  // ======================
  //  // Add headers to the worksheet
  //  const headers = Object.keys(data[0]); // Assuming all objects have the same keys
  //  worksheet.addRow(headers);
  // ======================
  // Add data rows
  // data.forEach(async(row, rowIndex) => {
  // // for(async(row, rowIndex) => {
  //   worksheet.addRow(row);
  //   // ===================
  //   // console.log(rowIndex);
  //   const index = rowIndex + 2;
  //   console.log(index);

  //   worksheet.getRow(index).eachCell((cell) => {
  //     cell.border = {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       bottom: { style: "thin" },
  //       right: { style: "thin" },
  //     };
  //     cell.alignment = { vertical: "middle", horizontal: "left" };
  //     // };
  //   });

  // });
  // =============================
  // const promise = Promise.all(
  console.log(data);

  data?.map(async (product, index) => {
    const rowNumber = index + 1;
    worksheet.addRow({
      // id: product?.id,
      // title: product?.title,
      // brand: product?.brand,
      // category: product?.category,
      // price: product?.price,
      // rating: product?.rating,
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });

    // const result: any = await toDataURL(product?.thumbnail);
    const result: any = await toDataURL(product?.image);
    console.log(result);

    // const splitted = product?.thumbnail.split(".");
    const splitted = product?.image.split(".");
    console.log(splitted);
    const extName = splitted[splitted.length - 1];
    console.log(extName);
    console.log(result.base64Url);

    const imageId2 = workbook.addImage({
      base64: result.base64Url,
      extension: extName,
      // extension: "jpeg",
    });
    console.log(rowNumber);
    console.log(imageId2);

    worksheet.addImage(imageId2, {
      tl: { col: 6, row: rowNumber },
      ext: { width: 100, height: 100 },
    });
  });
  // );
  // =========
  //   for (const rowData of data) {
  //     const row = worksheet.addRow({
  //       _id: rowData._id,
  //       name: rowData.name,
  //       description: rowData.description,
  //       price: rowData.price,
  //       stock: rowData.stock,
  //     });
  // console.log(row);

  //     // Fetch image data (if URL) and add to workbook

  //     row.height = 90; // Adjust row height to accommodate the image
  //   }
  // ================================================
  // Apply basic styling (example: header bold, center aligned)
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF91D2FF" },
      // fgColor: { argb: "FF0000FF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    // cell.font = {
    //   color: { argb: "FFFFFFFF" },
    // };
  });
  worksheet.getColumn(1).eachCell((cell, index) => {
    if (index > 1) {
      cell.value = index - 1;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    }
  });
  worksheet.getColumn(4).eachCell((cell, index) => {
    if (index > 1) {
      cell.alignment = { vertical: "middle", horizontal: "right" };
    }
  });
  worksheet.getColumn(5).eachCell((cell, index) => {
    if (index > 1) {
      cell.alignment = { vertical: "middle", horizontal: "right" };
    }
  });

  // Example of conditional styling (e.g., highlighting a specific cell based on value)
  // Assuming 'price' is a key in your data and you want to style cells where price > 100
  data.forEach((row, rowIndex) => {
    if (row.price && row.price > 30) {
      const priceCell = worksheet.getCell(`D${rowIndex + 2}`); // Adjust column index as needed
      priceCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" }, // Red background
      };
    }
  });

  // Generate and save the Excel file

  // // Generate and save the Excel file
  // workbook.xlsx.writeBuffer().then((buffer) => {
  //   const blob = new Blob([buffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });
  //   saveAs(blob, `${fileName}.xlsx`);
  // });

  // ============
  workbook.xlsx.writeBuffer().then(function (data) {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${fileName}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};

// =============================
// convertir l'image
const toDataURL = (url: any) => {
  console.log(url);

  const promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function () {
        resolve({ base64Url: reader.result });
      };
    };
    xhr.open("GET", url);

    xhr.responseType = "blob";
    xhr.send();
  });
  console.log(promise);

  return promise;
};
