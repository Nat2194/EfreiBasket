<template>
	<div
		class="mx-8 mt-6 mb-10 px-8 py-4 rounded-lg bg-white border-4 border-gray-100 shadow-lg"
	>
		<FullCalendar ref="calendar" :options="calendarOptions" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarStore } from '@/stores/calendar.store';
import { useScheduleStore } from '@/stores/schedule.store';

const calendarStore = useCalendarStore();
const scheduleStore = useScheduleStore();

export default defineComponent({
	components: {
		FullCalendar,
	},
	props: { admin: Boolean },
	emits: ['eventClicked'],

	data() {
		return {
			calendarOptions: {
				plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
				initialView: 'timeGridWeek',
				headerToolbar: {
					left: 'prev,today,next',
					center: 'title',
					right: 'timeGridDay,timeGridWeek,dayGridMonth',
				},
				events: [],
				nowIndicator: 'true',
				slotDuration: '01:00:00',
				slotMinTime: '12:00:00',
				slotMaxTime: '24:00:00',
				expandRows: 'true',
				height: 'auto',
				allDaySlot: false,
				fixedWeekCount: false,
				locale: 'fr',
				firstDay: 1,
				slotEventOverlap: true,
				slotLabelFormat: {
					hour: 'numeric',
					minute: '2-digit',
					omitZeroMinute: true,
					meridiem: 'false',
				},
				eventClick: (info) => {
					if (this.admin) {
						this.$emit('eventClicked', info.event);
					}
				},
			},
		};
	},
	async mounted() {
		// Envoyer une requête GET vers l'API
		// Récupérer les événements de la première requête
		const planningEvents = await calendarStore.getPlanning();

		// Récupérer les événements de la deuxième requête
		const scheduleEvents = await scheduleStore.convertScheduleToEvents();

		// Combinez les deux listes d'événements
		const combinedEvents = [...planningEvents, ...scheduleEvents];

		console.log(combinedEvents);

		// Affectez la liste combinée à this.calendarOptions.events
		this.calendarOptions.events = combinedEvents;
	},
});
</script>
