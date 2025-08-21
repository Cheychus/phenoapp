console.log('load data...');
// let arcRoData = getArcRoData();


async function getArcRoData() {
    const response = await fetch('/'); // fetch from local proxy endpoint
            let data = await response.json();
            console.log(data['@graph']);

            return data;
}

function getStudyData(arcRoJson){
            // Extract Study Data
            let studyData = [];
            arcRoJson['@graph'].forEach(node => {
                if(node['@type'] === 'Dataset' && node['additionalType'] === 'Study'){
                    studyData.push(node);
                }
            });
            
            console.log(studyData);
            return studyData;
}

function getAssayData(){

}