import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    height: "100vh",
    width: "100%",
  },
  row: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    // height: "100vh",
    // width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  // Para: {
  //   color: "#809FB8",
  //   letterSpacing: "0.26px",
  //   textAlign: "left",
  // },
  // LotStart: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   marginBottom: "4rem",
  // },
  // MainDiv: {
  //   // display: "flex",
  //   justifyContent: "center",
  //   flexDirection: "column",
  //   margin: "10px",
  // },
});

// Create Document Component

export default function MyDoc(props) {
  const {
    GerminationData1,
    // GerminationData2,
    DetailsData,
    FloweringData,
    // data,
  } = props;
  // console.log("pdf props GerminationData1", GerminationData1);
  // console.log("pdf props GerminationData2", GerminationData2);
  // console.log("pdf props DetailsData", DetailsData);
  // console.log("pdf props FloweringData", FloweringData);
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.vote_text}>Germination Data</Text>

        {GerminationData1 && (
          <View style={styles.row}>
            <View>
              <Text style={styles.vote_text}>Lot Id</Text>
              <Text style={styles.vote_text}>{GerminationData1.lotId}</Text>
            </View>
            <View>
              <Text style={styles.vote_text}>strainName</Text>
              <Text style={styles.vote_text}>
                {GerminationData1.strainName}
              </Text>
            </View>
            <View>
              <Text style={styles.vote_text}>nextGate</Text>
              <Text style={styles.vote_text}>{GerminationData1.nextGate}</Text>
            </View>
            <View>
              <Text style={styles.vote_text}>strainName</Text>
              <Text style={styles.vote_text}>{GerminationData1.lotId}</Text>
            </View>
            <View>
              <Text style={styles.vote_text}>strainName</Text>
              <Text style={styles.vote_text}>{GerminationData1.lotId}</Text>
            </View>
            <View>
              <Text style={styles.vote_text}>strainName</Text>
              <Text style={styles.vote_text}>{GerminationData1.lotId}</Text>
            </View>
          </View>
        )}
        <Text style={styles.vote_text}>vegitative</Text>

        <br />
        {DetailsData &&
          DetailsData.length > 0 &&
          DetailsData.map((item, i) => (
            <View style={styles.row}>
              {/* <View> */}
              <Text style={styles.vote_text}>WEEK {i + 1}</Text>
              {/* </View> */}
              <Text style={styles.vote_text}>nutrition</Text>

              <Text style={styles.vote_text}>{item.nutrition}</Text>
              {/* </View> */}
              {/* <View style={styles.section}> */}
              <Text style={styles.vote_text}>strainName</Text>
              <Text style={styles.vote_text}>{item.strainName}</Text>

              <Text style={styles.vote_text}>root Colour</Text>
              <Text style={styles.vote_text}>{item.strainName}</Text>
              <Text style={styles.vote_text}>status</Text>
              <Text style={styles.vote_text}>{item.status}</Text>
              <Text style={styles.vote_text}>rootColour</Text>
              <Text style={styles.vote_text}>{item.strainName}</Text>
              <Text style={styles.vote_text}>status</Text>
              <Text style={styles.vote_text}>{item.status}</Text>
              <br />
            </View>
          ))}
        <Text style={styles.vote_text}>flower stage</Text>

        <br />
        {FloweringData &&
          FloweringData.length > 0 &&
          FloweringData.map((item, i) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.vote_text}>WEEK {i + 1}</Text>
              </View>
              <Text style={styles.vote_text}>nutrition</Text>

              <Text style={styles.vote_text}>{item.nutrition}</Text>
              {/* </View> */}
              {/* <View style={styles.section}> */}
              <Text style={styles.vote_text}>strainName</Text>
              <Text style={styles.vote_text}>{item.strainName}</Text>

              <Text style={styles.vote_text}>root Colour</Text>
              <Text style={styles.vote_text}>{item.strainName}</Text>
              <Text style={styles.vote_text}>status</Text>
              <Text style={styles.vote_text}>{item.status}</Text>
              <Text style={styles.vote_text}>rootColour</Text>
              <Text style={styles.vote_text}>{item.strainName}</Text>
              <Text style={styles.vote_text}>status</Text>
              <Text style={styles.vote_text}>{item.status}</Text>
            </View>
          ))}

        <br />
      </Page>
    </Document>
  );
}

// export function MyDocument(props) {
//   console.log("pdf props", props.data);

//   return
//   (
//     <Document>
//       <Page size="A4" style={styles.page} wrap>
//         <Text className={styles.Para}>Report </Text>

//         {Row &&
//           Row.length > 0 &&
//           Row.map((row, i) => (
//             <View >
//               <View >
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Lot Id</Text>

//                   <Text className={styles.ColDiv}> {row.lotId}</Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Batch ID</Text>
//                   <Text className={styles.ColDiv}> {row.batchId}</Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Strain Name </Text>
//                   <Text className={styles.ColDiv}> {row.strainName}</Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Exit Date</Text>
//                   <Text className={styles.ColDiv}> {row.exitDate}</Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Next Date</Text>
//                   <Text className={styles.ColDiv}> {row.nextGate}</Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Amount</Text>
//                   <Text className={styles.ColDiv}>
//                     {" "}
//                     {row.amount} ({row.measure}){" "}
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Grower</Text>
//                   <Text className={styles.ColDiv}> {row.grower}</Text>
//                 </View>
//               </View>
//               <View style={styles.section}>
//                 <View className={styles.MainDiv}>
//                   <Text className={styles.Para}>Status</Text>
//                   <Text className={styles.ColDiv}> {row.status}</Text>
//                 </View>
//               </View>
//               <br />
//             </View>
//           ))}

//         {/* <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View> */}
//       </Page>
//     </Document>
//   )
// };
// export default MyDocument;
