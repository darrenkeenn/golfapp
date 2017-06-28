export default function (CoreConstants) {
  'ngInject';

  return {

    players: CoreConstants.players,
    scores: CoreConstants.scores,

    getBestHoleScores(course) {
      const courseScores = this.scores.filter((score) => score.course_id === course);
      const range = Array.from({length: 18}, (value, index) => index);
      const INITIAL = {
        "player_id": [],
        "score": 11
      };

      if (courseScores.length === 0) {
        return range.map(() => Object.assign({}, INITIAL));
      }

      return range.map((index) => {
        return courseScores.reduce((total, current) => {
          const currentScore = current.score[index];
          if (currentScore < total.score) {
            total.player_id = [];
            total.score = currentScore;
            total.player_id.push(current.player_id);
          } else if (currentScore === total.score && !total.player_id.includes(current.player_id)) {
            total.player_id.push(current.player_id);
          }

          return total;
        }, Object.assign({}, INITIAL));
      });
    },

    getCourseInformation(selectedCourse) {
      return CoreConstants.courses.find((course) => course.course_id === selectedCourse);
    },
  }
}
