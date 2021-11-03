import createSeriesMetadata from './createSeriesMetadata';

function createStudyMetadata(StudyInstanceUID) {
  return {
    StudyInstanceUID,
    isLoaded: false,
    series: [],
    /**
     *
     * @param {object} instance
     * @returns {bool} true if series were added; false if series already exist
     */
    addInstanceToSeries: function (instance) {
      const { SeriesInstanceUID } = instance;
      const existingSeries = this.series.find(
        s => s.SeriesInstanceUID === SeriesInstanceUID
      );

      if (existingSeries) {
        existingSeries.instances.push(instance);
      } else {
        const series = createSeriesMetadata([instance]);
        this.series.push(series);
      }
    },
    /**
     *
     * @param {object[]} instances
     * @param {string} instances[].SeriesInstanceUID
     * @returns {bool} true if series were added; false if series already exist
     */
    addInstancesToSeries: function (instances) {
      const { SeriesInstanceUID } = instances[0];
      const existingSeries = this.series.find(
        s => s.SeriesInstanceUID === SeriesInstanceUID
      );

      if (existingSeries) {
        existingSeries.instances.push(...instances);
      } else {
        const series = createSeriesMetadata(instances);
        this.series.push(series);
      }
    },

    setSeriesMetadata: function (SeriesInstanceUID, seriesMetadata) {
      let existingSeries = this.series.find(
        s => s.SeriesInstanceUID === SeriesInstanceUID
      );

      if (existingSeries) {
        existingSeries = Object.assign(existingSeries, seriesMetadata);
      } else {
        this.series.push(Object.assign({ instances: [] }, seriesMetadata));
      }
    },
  };
}

export default createStudyMetadata;
