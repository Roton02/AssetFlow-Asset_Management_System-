import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
  }
});

const PrintAsset = ({ asset }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Company Name</Text>
      </View>
      <View style={styles.section}>
        <Text>Product Name: {asset.productName}</Text>
        <Text>Product Type: {asset.productType}</Text>
        <Text>Requested Date: {asset.requestedDate}</Text>
        <Text>Approval Date: {asset.approvalDate || "Not Approved Yet"}</Text>
        <Text>Request Status: {asset.status}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Printing Date: {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

export default PrintAsset;
